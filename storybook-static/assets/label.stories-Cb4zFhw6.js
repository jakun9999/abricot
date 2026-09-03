import{n as e}from"./rolldown-runtime-CsOFd3vK.js";import{t}from"./jsx-runtime-CadfrxEJ.js";import{n,t as r}from"./label-Q3N_5XK5.js";var i,a,o,s,c,l,u,d,f;function p(){return(p=e((()=>{i=t(),n(),{expect:a}=__STORYBOOK_MODULE_TEST__,o={component:r,parameters:{layout:`centered`}},s={render:()=>(0,i.jsxs)(`div`,{className:`flex flex-wrap items-center gap-2`,children:[(0,i.jsx)(r,{color:`red`,text:`À faire`}),(0,i.jsx)(r,{color:`warningOrangeLight`,text:`En cours`}),(0,i.jsx)(r,{color:`green`,text:`Terminé`}),(0,i.jsx)(r,{color:`grey`,text:`Annulé`})]})},c={args:{color:`red`,text:`À faire`},play:async({canvas:e,args:t})=>{await a(e.getByText(t.text)).toBeVisible()}},l={args:{color:`warningOrangeLight`,text:`En cours`}},u={args:{color:`green`,text:`Terminé`}},d={args:{color:`grey`,text:`3`}},f=[`StatutsKanban`,`AFaire`,`EnCours`,`Termine`,`Compteur`],s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap items-center gap-2">
      <Label color="red" text="À faire" />
      <Label color="warningOrangeLight" text="En cours" />
      <Label color="green" text="Terminé" />
      <Label color="grey" text="Annulé" />
    </div>
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    color: 'red',
    text: 'À faire'
  },
  play: async ({
    canvas,
    args
  }) => {
    await expect(canvas.getByText(args.text!)).toBeVisible();
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    color: 'warningOrangeLight',
    text: 'En cours'
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    color: 'green',
    text: 'Terminé'
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    color: 'grey',
    text: '3'
  }
}`,...d.parameters?.docs?.source}}}})))()}p();export{c as AFaire,d as Compteur,l as EnCours,s as StatutsKanban,u as Termine,f as __namedExportsOrder,o as default};