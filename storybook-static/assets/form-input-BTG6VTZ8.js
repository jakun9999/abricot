import{n as e}from"./rolldown-runtime-CsOFd3vK.js";import{t}from"./jsx-runtime-CadfrxEJ.js";function n({inputId:e=``,mandatory:t=!1,inputType:n=`text`,label:i=``,placeHolder:a=``,inputWidth:o=`w-[280px]`,value:s,onChange:c,className:l=``,...u}){let d=`flex items-center justify-start h-[53px] ${o} max-w-full
    px-[17px] bg-white border rounded-[4px] border-abr-grey-200 text-body-s 
    text-abr-grey-600 placeholder:text-abr-grey-300 focus:outline-abr-dark-orange 
    focus:outline focus:outline-offset-0 focus:outline focus:outline-solid`;return(0,r.jsxs)(`div`,{className:`flex flex-col gap-1.75 max-w-full`,children:[(0,r.jsxs)(`label`,{htmlFor:e,className:`text-body-s text-black`,children:[i,t?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(`span`,{"aria-hidden":`true`,children:`*`}),(0,r.jsx)(`span`,{className:`sr-only`,children:` (obligatoire)`})]}):null]}),(0,r.jsx)(`input`,{id:e,type:n,placeholder:a,className:`${l} ${d}`,value:s,onChange:c,...u,"aria-required":t||void 0})]})}var r;function i(){return(i=e((()=>{r=t(),n.__docgenInfo={description:`Couple label + champ texte. \`className\` s’applique à l’\`<input>\`, pas au wrapper.

@example
\`\`\`tsx
<FormInput
  inputId="email"
  label="Email"
  inputType="email"
  mandatory
  autoComplete="email"
/>
\`\`\``,methods:[],displayName:`FormInput`,props:{inputId:{required:!1,tsType:{name:`string`},description:"`id` HTML, relié au `<label htmlFor>`. Doit être unique dans la page.",defaultValue:{value:`""`,computed:!1}},mandatory:{required:!1,tsType:{name:`boolean`},description:"Affiche un astérisque visuel et `aria-required`.",defaultValue:{value:`false`,computed:!1}},inputType:{required:!1,tsType:{name:`union`,raw:`"text" | "password" | "email" | "number" | "date" | "selector"`,elements:[{name:`literal`,value:`"text"`},{name:`literal`,value:`"password"`},{name:`literal`,value:`"email"`},{name:`literal`,value:`"number"`},{name:`literal`,value:`"date"`},{name:`literal`,value:`"selector"`}]},description:"Type HTML de l’input. `selector` et `date` sont hérités ; préférer les composants dédiés.",defaultValue:{value:`"text"`,computed:!1}},label:{required:!1,tsType:{name:`string`},description:`Libellé visible au-dessus du champ.`,defaultValue:{value:`""`,computed:!1}},placeHolder:{required:!1,tsType:{name:`string`},description:`Placeholder (contraste volontairement faible : maquette).`,defaultValue:{value:`""`,computed:!1}},inputWidth:{required:!1,tsType:{name:`string`},description:"Classe Tailwind de largeur du champ (défaut `w-[280px]`).",defaultValue:{value:`"w-[280px]"`,computed:!1}},className:{defaultValue:{value:`""`,computed:!1},required:!1}}}})))()}export{i as n,n as t};