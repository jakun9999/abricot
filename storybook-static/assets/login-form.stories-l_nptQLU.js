import{n as e}from"./rolldown-runtime-CsOFd3vK.js";import{t}from"./react-Z7gd5LxR.js";import{a as n,r}from"./navigation-Ck6cazFE.js";import{t as i}from"./jsx-runtime-CadfrxEJ.js";import{n as a,r as o}from"./auth-context-DHOUa8aV.js";import{n as s,t as c}from"./form-input-BTG6VTZ8.js";import{f as l,t as u}from"./icons-xHe3bdQz.js";import{n as d,t as f}from"./link-DriKXggc.js";function p(){let[e,t]=(0,h.useState)(``),[r,i]=(0,h.useState)(``),[a,s]=(0,h.useState)(null),[l,u]=(0,h.useState)(!1),{setUser:d}=o(),f=n();return(0,m.jsxs)(`form`,{onSubmit:async t=>{t.preventDefault(),s(null),u(!0);try{let t=await fetch(`/api/login`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({email:e,password:r})}),n=await t.json();if(!t.ok||!n.success)throw Error(n.message||`Identifiants incorrects`);d(n.user),f.push(`/dashboard`),f.refresh()}catch(e){s(e instanceof Error?e.message:`Identifiants incorrects`)}finally{u(!1)}},className:`flex flex-col items-center gap-7.25`,children:[(0,m.jsx)(`h1`,{className:`text-abr-dark-orange`,children:`Connexion`}),(0,m.jsx)(c,{label:`Email`,inputId:`email`,inputType:`email`,className:`w-70.5 max-w-full`,autoComplete:`email`,required:!0,"aria-invalid":a?!0:void 0,value:e,onChange:e=>t(e.target.value)}),(0,m.jsx)(c,{label:`Mot de passe`,inputId:`password`,inputType:`password`,className:`w-70.5 max-w-full`,autoComplete:`current-password`,required:!0,"aria-invalid":a?!0:void 0,value:r,onChange:e=>i(e.target.value)}),(0,m.jsx)(`button`,{type:`submit`,className:`w-62.25 max-w-full h-12.5 rounded-[10px] bg-black text-abr-white text-body-m`,children:l?`Connexion...`:`Se connecter`}),(0,m.jsx)(`p`,{className:`${a?``:`hidden `}text-body-s text-abr-error-red`,role:`alert`,children:a})]})}var m,h;function g(){return(g=e((()=>{m=i(),s(),h=t(),r(),a(),p.__docgenInfo={description:"Formulaire de connexion. Succès → cookie posé par `/api/login`, puis `/dashboard`.",methods:[],displayName:`LoginForm`}})))()}var _,v,y,b,x,S,C,w;function T(){return(T=e((()=>{_=i(),g(),u(),f(),{expect:v,waitFor:y}=__STORYBOOK_MODULE_TEST__,b={component:p,parameters:{layout:`fullscreen`,backgrounds:{default:`white`}},decorators:[e=>(0,_.jsx)(`div`,{className:`flex min-h-screen w-full bg-white`,children:(0,_.jsxs)(`div`,{className:`flex w-full flex-col gap-10 md:gap-0 md:justify-between max-h-256 items-center py-[111.92] px-4`,children:[(0,_.jsx)(l,{className:`w-[252.57px] max-w-full h-[32.17px] text-abr-dark-orange`,"aria-label":`Logo Abricot`,role:`img`}),(0,_.jsx)(e,{}),(0,_.jsxs)(`p`,{className:`flex flex-wrap items-center justify-center text-center text-body-s px-2`,children:[`Pas encore de compte ?`,(0,_.jsx)(d,{href:`/signin`,className:`ml-2.5 text-abr-dark-orange underline`,children:`Créer un compte`})]})]})})]},x={},S={play:async({canvas:e,userEvent:t})=>{await t.type(e.getByLabelText(`Email`),`a@b.com`),await t.type(e.getByLabelText(`Mot de passe`),`secret`),await t.click(e.getByRole(`button`,{name:/se connecter/i})),await y(()=>v(e.getByRole(`button`,{name:/^se connecter$/i})).toBeVisible())}},C={play:async({canvas:e,userEvent:t})=>{await t.type(e.getByLabelText(`Email`),`wrong@abricot.test`),await t.type(e.getByLabelText(`Mot de passe`),`nope`),await t.click(e.getByRole(`button`,{name:/se connecter/i})),await v(await e.findByText(/identifiants incorrects/i)).toBeVisible()}},w=[`Default`,`FormulaireRempli`,`IdentifiantsInvalides`],x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvas,
    userEvent
  }) => {
    await userEvent.type(canvas.getByLabelText('Email'), 'a@b.com');
    await userEvent.type(canvas.getByLabelText('Mot de passe'), 'secret');
    await userEvent.click(canvas.getByRole('button', {
      name: /se connecter/i
    }));
    await waitFor(() => expect(canvas.getByRole('button', {
      name: /^se connecter$/i
    })).toBeVisible());
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvas,
    userEvent
  }) => {
    await userEvent.type(canvas.getByLabelText('Email'), 'wrong@abricot.test');
    await userEvent.type(canvas.getByLabelText('Mot de passe'), 'nope');
    await userEvent.click(canvas.getByRole('button', {
      name: /se connecter/i
    }));
    await expect(await canvas.findByText(/identifiants incorrects/i)).toBeVisible();
  }
}`,...C.parameters?.docs?.source}}}})))()}T();export{x as Default,S as FormulaireRempli,C as IdentifiantsInvalides,w as __namedExportsOrder,b as default};