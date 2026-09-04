import{n as e}from"./rolldown-runtime-CsOFd3vK.js";import{t}from"./jsx-runtime-CadfrxEJ.js";import{a as n,i as r,n as i,o as a,r as o,t as s}from"./folder-icon-BBtAazaJ.js";import{n as c,t as l}from"./link-DriKXggc.js";function u({icon:e,color:t,text:r,href:i,current:a=!1,className:l=``,...u}){let f=`flex items-center justify-center h-11.25 px-4 gap-3.5 hover:cursor-pointer rounded-lg text-abr-dark-orange ${t===`white`?`bg-abr-white hover:bg-abr-light-orange transition-colors duration-500`:`bg-abr-light-orange`} ${l}`,p=(0,d.jsxs)(d.Fragment,{children:[e===`task`&&(0,d.jsx)(o,{className:`size-4`,"aria-hidden":`true`}),e===`calendar`&&(0,d.jsx)(n,{className:`size-4`,"aria-hidden":`true`}),e===`folder`&&(0,d.jsx)(s,{className:`size-4`,"aria-hidden":`true`}),r&&(0,d.jsx)(`span`,{className:`text-body-s`,children:r})]});return i?(0,d.jsx)(c,{href:i,className:f,"aria-current":a?`page`:void 0,children:p}):(0,d.jsx)(`button`,{...u,className:f,children:p})}var d;function f(){return(f=e((()=>{d=t(),r(),a(),i(),l(),u.__docgenInfo={description:'Puce de navigation (Liste / Kanban / Calendrier). Lien si `href`, bouton sinon.\n\n@example\n```tsx\n<Chips href="/dashboard" icon="task" text="Liste" color="light" current />\n```',methods:[],displayName:`Chips`,props:{icon:{required:!0,tsType:{name:`union`,raw:`"task" | "calendar" | "folder"`,elements:[{name:`literal`,value:`"task"`},{name:`literal`,value:`"calendar"`},{name:`literal`,value:`"folder"`}]},description:"Pictogramme à gauche du libellé.\n- `task` : case cochée (vue liste).\n- `calendar` : calendrier / kanban.\n- `folder` : dossier (projets)."},color:{required:!0,tsType:{name:`union`,raw:`"light" | "white"`,elements:[{name:`literal`,value:`"light"`},{name:`literal`,value:`"white"`}]},description:"Fond. `light` = état actif (orange clair), `white` = inactif."},text:{required:!1,tsType:{name:`string`},description:`Texte affiché à droite de l’icône.`},href:{required:!1,tsType:{name:`string`},description:"Si fourni, le chip est un lien Next.js (évite un bouton dans un `<Link>`).\nSinon c’est un `<button>`."},current:{required:!1,tsType:{name:`boolean`},description:'Page courante : pose `aria-current="page"` sur le lien.',defaultValue:{value:`false`,computed:!1}},className:{defaultValue:{value:`""`,computed:!1},required:!1}}}})))()}var p,m,h,g,_,v,y,b,x;function S(){return(S=e((()=>{p=t(),f(),{expect:m}=__STORYBOOK_MODULE_TEST__,h={component:u,parameters:{layout:`centered`},args:{icon:`task`,color:`light`,text:`Liste`}},g={render:()=>(0,p.jsxs)(`nav`,{className:`flex gap-2.5`,"aria-label":`Vues du tableau de bord`,children:[(0,p.jsx)(u,{href:`/dashboard`,icon:`task`,text:`Liste`,color:`light`,current:!0}),(0,p.jsx)(u,{href:`/dashboard/kanban`,icon:`calendar`,text:`Kanban`,color:`white`})]}),play:async({canvas:e})=>{await m(e.getByRole(`link`,{name:/liste/i})).toHaveAttribute(`aria-current`,`page`)}},_={args:{icon:`task`,text:`Liste`,color:`light`}},v={args:{icon:`calendar`,text:`Kanban`,color:`white`}},y={args:{icon:`calendar`,text:`Calendrier`,color:`white`}},b={args:{icon:`task`,text:`Liste`,color:`light`},play:async({canvas:e})=>{let t=e.getByRole(`button`,{name:/liste/i});await m(getComputedStyle(t).backgroundColor).toBe(`rgb(255, 232, 217)`)}},x=[`VuesDashboard`,`Liste`,`Kanban`,`Calendrier`,`CssCheck`],g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <nav className="flex gap-2.5" aria-label="Vues du tableau de bord">
      <Chips href="/dashboard" icon="task" text="Liste" color="light" current />
      <Chips href="/dashboard/kanban" icon="calendar" text="Kanban" color="white" />
    </nav>,
  play: async ({
    canvas
  }) => {
    await expect(canvas.getByRole('link', {
      name: /liste/i
    })).toHaveAttribute('aria-current', 'page');
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    icon: 'task',
    text: 'Liste',
    color: 'light'
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    icon: 'calendar',
    text: 'Kanban',
    color: 'white'
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    icon: 'calendar',
    text: 'Calendrier',
    color: 'white'
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    icon: 'task',
    text: 'Liste',
    color: 'light'
  },
  play: async ({
    canvas
  }) => {
    const chip = canvas.getByRole('button', {
      name: /liste/i
    });
    // Chips light uses bg-abr-light-orange (#ffe8d9) — fails if globals.css did not load.
    await expect(getComputedStyle(chip).backgroundColor).toBe('rgb(255, 232, 217)');
  }
}`,...b.parameters?.docs?.source}}}})))()}S();export{y as Calendrier,b as CssCheck,v as Kanban,_ as Liste,g as VuesDashboard,x as __namedExportsOrder,h as default};