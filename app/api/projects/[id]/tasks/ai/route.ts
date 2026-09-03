import { NextResponse } from "next/server";
import { z } from "zod";
import { generateText, Output } from "ai";
import { mistral, type MistralLanguageModelChatOptions } from "@ai-sdk/mistral";
import { fetchServer } from "@/lib/api-server";
import { Project } from "@/schemas/project-schema";
import {
  AiGeneratedTaskSchema,
  AiGeneratedTasksResponseSchema,
  normalizeDueDate,
} from "@/schemas/ai-generated-task-schema";

export const maxDuration = 60;

interface RouteProps {
  params: Promise<{
    id: string;
  }>;
}

const RequestSchema = z.object({
  prompt: z.string().trim().min(1, "Décrivez les tâches à générer."),
  existingTasks: z.array(AiGeneratedTaskSchema).optional().default([]),
});

export async function POST(request: Request, { params }: RouteProps) {
  try {
    if (!process.env.MISTRAL_API_KEY) {
      return NextResponse.json(
        {
          success: false,
          message:
            "La clé MISTRAL_API_KEY est manquante. Ajoutez-la dans .env.local pour générer des tâches.",
        },
        { status: 503 },
      );
    }

    const { id } = await params;
    const body = await request.json();
    const validation = RequestSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message:
            validation.error.issues[0]?.message ??
            "Requête de génération invalide.",
        },
        { status: 400 },
      );
    }

    const projectResponse = await fetchServer(`/projects/${id}`);
    if (!projectResponse.ok) {
      return NextResponse.json(
        {
          success: false,
          message: "Impossible de charger le projet pour la génération.",
        },
        { status: projectResponse.status },
      );
    }

    const projectPayload = await projectResponse.json().catch(() => null);
    const project: Project | null =
      projectPayload?.data?.project ?? projectPayload?.project ?? null;

    if (!project) {
      return NextResponse.json(
        {
          success: false,
          message: "Projet introuvable.",
        },
        { status: 404 },
      );
    }

    const { prompt, existingTasks } = validation.data;
    const jsonSchema = z.toJSONSchema(AiGeneratedTasksResponseSchema);
    const today = new Date().toISOString();
    const modelId = process.env.MISTRAL_MODEL ?? "mistral-small-latest";

    const existingTasksBlock =
      existingTasks.length > 0
        ? `\nListe actuelle des tâches proposées (à mettre à jour selon la demande) :\n${JSON.stringify(existingTasks, null, 2)}\n`
        : "";

    const result = await generateText({
      model: mistral(modelId),
      output: Output.object({
        schema: AiGeneratedTasksResponseSchema,
        name: "GeneratedTasks",
        description:
          "Liste de tâches à créer dans le projet, compatible avec le schéma Zod d'une tâche.",
      }),
      providerOptions: {
        mistral: {
          strictJsonSchema: true,
        } satisfies MistralLanguageModelChatOptions,
      },
      system: `Tu es un assistant qui propose des tâches pour un projet collaboratif.
Réponds uniquement via le schéma JSON fourni.
Génère entre 1 et 8 tâches concrètes, actionnables et adaptées au projet.
Le statut des tâches sera TODO à la création : ne le génère pas.
N'invente pas d'identifiants, d'assignés ni de commentaires.
Les priorités autorisées sont LOW, MEDIUM, HIGH, URGENT.
dueDate doit être une datetime ISO 8601 (ex: ${today}) ou une chaîne vide s'il n'y a pas d'échéance.
Si une liste de tâches existantes est fournie, applique la nouvelle demande (ajouter, modifier, retirer, affiner) et renvoie la liste complète mise à jour.

Projet :
- titre : ${project.name}
- description : ${project.description}

Schéma JSON compatible avec une tâche (champs de création) :
${JSON.stringify(jsonSchema, null, 2)}`,
      prompt: `${existingTasksBlock}Demande de l'utilisateur :\n${prompt}`,
    });

    const generated = result.output.tasks
      .map((task) => ({
        title: task.title.trim(),
        description: task.description.trim(),
        priority: task.priority,
        dueDate: normalizeDueDate(task.dueDate),
      }))
      .filter((task) => task.title.length > 0);

    return NextResponse.json({
      success: true,
      tasks: generated,
    });
  } catch (error) {
    console.error("Error generating AI tasks", error);
    return NextResponse.json(
      {
        success: false,
        message:
          "Impossible de générer les tâches. Vérifiez votre clé Mistral puis réessayez.",
      },
      { status: 500 },
    );
  }
}
