import{n as e}from"./rolldown-runtime-CsOFd3vK.js";import{n as t,t as n}from"./abr-button-CaPOPHtl.js";var r,i,a,o,s,c;function l(){return(l=e((()=>{t(),{expect:r}=__STORYBOOK_MODULE_TEST__,i={component:n,parameters:{layout:`centered`}},a={args:{type:`button`,color:`black`,label:`+ Créer un projet`,className:`w-45.25 h-12.5 shrink-0`},play:async({canvas:e,args:t})=>{await r(e.getByRole(`button`,{name:t.label})).toHaveTextContent(t.label)}},o={args:{type:`button`,color:`outline`,label:`Annuler`,className:`min-w-27.5`}},s={args:{type:`button`,color:`disabled`,label:`+ Créer un projet`,className:`w-45.25 h-12.5 shrink-0`,disabled:!0}},c=[`CreerUnProjet`,`Annuler`,`Desactive`],a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'button',
    color: 'black',
    label: '+ Créer un projet',
    className: 'w-45.25 h-12.5 shrink-0'
  },
  play: async ({
    canvas,
    args
  }) => {
    await expect(canvas.getByRole('button', {
      name: args.label
    })).toHaveTextContent(args.label);
  }
}`,...a.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'button',
    color: 'outline',
    label: 'Annuler',
    className: 'min-w-27.5'
  }
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'button',
    color: 'disabled',
    label: '+ Créer un projet',
    className: 'w-45.25 h-12.5 shrink-0',
    disabled: true
  }
}`,...s.parameters?.docs?.source}}}})))()}l();export{o as Annuler,a as CreerUnProjet,s as Desactive,c as __namedExportsOrder,i as default};