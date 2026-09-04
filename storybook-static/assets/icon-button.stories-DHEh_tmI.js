import{n as e}from"./rolldown-runtime-CsOFd3vK.js";import{t}from"./jsx-runtime-CadfrxEJ.js";import{i as n,n as r,r as i,t as a}from"./points-icon-CJtqLKm-.js";function o({label:e,className:t=`h-14.25 w-14.25`,...n}){let r=``;r=e===`back`?`text-black border-gray-200 hover:border-abr-dark-orange hover:text-abr-dark-orange transition-colors duration-500`:`text-gray-600 border-gray-200 hover:border-abr-dark-orange hover:text-abr-dark-orange transition-colors duration-500`;let o=n[`aria-label`]??(e===`back`?`Retour`:`Plus d'actions`);return(0,s.jsxs)(`button`,{type:`button`,className:`flex items-center justify-center text-caption-l cursor-pointer rounded-[10px] border bg-white ${r} ${t}`,"aria-label":o,...n,children:[e===`back`&&(0,s.jsx)(i,{"aria-hidden":`true`}),e===`points`&&(0,s.jsx)(a,{"aria-hidden":`true`})]})}var s;function c(){return(c=e((()=>{s=t(),n(),r(),o.__docgenInfo={description:'Bouton icône bordé (carré arrondi). Taille par défaut 57×57 (`h-14.25`), pas 40×40 :\nc’est la cote Figma du bouton « retour / plus ».\n\n@example\n```tsx\n<IconButton label="back" aria-label="Retour à la liste des projets" />\n```',methods:[],displayName:`IconButton`,props:{label:{required:!0,tsType:{name:`union`,raw:`"back" | "points"`,elements:[{name:`literal`,value:`"back"`},{name:`literal`,value:`"points"`}]},description:"Pictogramme affiché. Le nom accessible est déduit si `aria-label` n’est pas fourni.\n- `back` : retour (flèche).\n- `points` : actions supplémentaires (trois points)."},className:{defaultValue:{value:`"h-14.25 w-14.25"`,computed:!1},required:!1}}}})))()}var l,u,d,f,p;function m(){return(m=e((()=>{c(),{expect:l}=__STORYBOOK_MODULE_TEST__,u={component:o,parameters:{layout:`centered`}},d={args:{label:`back`,"aria-label":`Retour à la liste des projets`},play:async({canvas:e})=>{await l(e.getByRole(`button`,{name:`Retour à la liste des projets`})).toHaveAttribute(`aria-label`,`Retour à la liste des projets`)}},f={args:{label:`points`}},p=[`Retour`,`PlusDActions`],d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'back',
    'aria-label': 'Retour à la liste des projets'
  },
  play: async ({
    canvas
  }) => {
    await expect(canvas.getByRole('button', {
      name: 'Retour à la liste des projets'
    })).toHaveAttribute('aria-label', 'Retour à la liste des projets');
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'points'
  }
}`,...f.parameters?.docs?.source}}}})))()}m();export{f as PlusDActions,d as Retour,p as __namedExportsOrder,u as default};