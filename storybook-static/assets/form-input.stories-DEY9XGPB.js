import{n as e}from"./rolldown-runtime-CsOFd3vK.js";import{n as t,t as n}from"./form-input-BTG6VTZ8.js";var r,i,a,o,s,c;function l(){return(l=e((()=>{t(),{expect:r}=__STORYBOOK_MODULE_TEST__,i={component:n,parameters:{layout:`centered`},args:{className:`w-70.5 max-w-full`}},a={args:{inputId:`email`,label:`Email`,inputType:`email`,autoComplete:`email`},play:async({canvas:e})=>{await r(e.getByLabelText(`Email`)).toHaveAttribute(`type`,`email`)}},o={args:{inputId:`password`,label:`Mot de passe`,inputType:`password`,autoComplete:`current-password`}},s={args:{inputId:`name`,label:`Nom`,inputType:`text`,mandatory:!0}},c=[`Email`,`MotDePasse`,`NomObligatoire`],a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    inputId: 'email',
    label: 'Email',
    inputType: 'email',
    autoComplete: 'email'
  },
  play: async ({
    canvas
  }) => {
    await expect(canvas.getByLabelText('Email')).toHaveAttribute('type', 'email');
  }
}`,...a.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    inputId: 'password',
    label: 'Mot de passe',
    inputType: 'password',
    autoComplete: 'current-password'
  }
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    inputId: 'name',
    label: 'Nom',
    inputType: 'text',
    mandatory: true
  }
}`,...s.parameters?.docs?.source}}}})))()}l();export{a as Email,o as MotDePasse,s as NomObligatoire,c as __namedExportsOrder,i as default};