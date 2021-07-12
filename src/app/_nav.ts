import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Inicio',
    url: '/dashboard',
    icon: '',
    /*badge: {
      variant: 'info',
      text: 'NEW'
    }*/
  },
  /*{
    title: true,
    name: 'Theme'
  },
  {
    name: 'Colors',
    url: '/theme/colors',
    icon: 'icon-drop'
  },
  {
    name: 'Typography',
    url: '/theme/typography',
    icon: 'icon-pencil'
  },
  {
    title: true,
    name: 'Catálogos'
  },*/
  {
    name: 'Plazas',
    url: '/plazas',
    icon: 'icon-puzzle',
    children: [
      {
        name: 'Plazas',
        url: '/plazas/plazas',
        //icon: 'icon-puzzle'
      },
      {
        name: 'Horas',
        url: '/plazas/horasclase',
        //icon: 'icon-puzzle'
      },
      {
        name: 'Personas',
        url: '/plazas/personal',
        //icon: 'icon-puzzle'
      },
      {
        name: 'Carga horaria',
        url: '/plazas/personalhoras',
        //icon: 'icon-puzzle'
      },
      {
        name: 'Plantillas',
        url: '/plazas/plantillas',
        //icon: 'icon-puzzle'
      },
    ]
  },
  {
    name: 'Configuración',
    url: '/catalogos',
    icon: 'icon-puzzle',
    children: [

      {
        name: 'Municipios',
        url: '/catalogos/catmunicipios',
        //icon: 'icon-puzzle'
      },
      {
        name: 'Localidades',
        url: '/catalogos/catlocalidades',
        //icon: 'icon-puzzle'
      },
      {
        name: 'Planteles',
        url: '/catalogos/catplanteles',
        //icon: 'icon-puzzle'
      },
      {
        name: 'Centros de trabajo',
        url: '/catalogos/catcentrostrabajo',
        //icon: 'icon-puzzle'
      },
      {
        name: 'Zonas económicas',
        url: '/catalogos/catzonaeconomica',
        //icon: 'icon-puzzle'
      },
      {
        name: 'Zonas geográficas',
        url: '/catalogos/catzonageografica',
        //icon: 'icon-puzzle'
      },
      {
        name: 'Regiones',
        url: '/catalogos/catregiones',
        //icon: 'icon-puzzle'
      },
      {
        name: 'Categorías',
        url: '/catalogos/categorias',
        //icon: 'icon-puzzle'
      },
      {
        name: 'Estructura ocupacional',
        url: '/catalogos/categoriastabular',
        //icon: 'icon-puzzle'
      },
      {
        name: 'Estatus de la plaza',
        url: '/catalogos/catestatusplaza',
        //icon: 'icon-puzzle'
      },
      {
        name: 'Semestres',
        url: '/catalogos/semestre',
        //icon: 'icon-puzzle'
      },
      {
        name: 'Quincenas',
        url: '/catalogos/catquincena',
        //icon: 'icon-puzzle'
      },
      {
        name: 'Grupos',
        url: '/catalogos/gruposclase',
        //icon: 'icon-puzzle'
      },
      {
        name: 'Materias',
        url: '/catalogos/materiasclase',
        //icon: 'icon-puzzle'
      },
      {
        name: 'Usuarios',
        url: '/autenticacion/usuarios',
        //icon: 'icon-puzzle'
      },
    ]
  },


  /*{
    name: 'Buttons',
    url: '/buttons',
    icon: 'icon-cursor',
    children: [
      {
        name: 'Buttons',
        url: '/buttons/buttons',
        icon: 'icon-cursor'
      },
      {
        name: 'Dropdowns',
        url: '/buttons/dropdowns',
        icon: 'icon-cursor'
      },
      {
        name: 'Brand Buttons',
        url: '/buttons/brand-buttons',
        icon: 'icon-cursor'
      }
    ]
  },
  {
    name: 'Charts',
    url: '/charts',
    icon: 'icon-pie-chart'
  },
  {
    name: 'Icons',
    url: '/icons',
    icon: 'icon-star',
    children: [
      {
        name: 'CoreUI Icons',
        url: '/icons/coreui-icons',
        icon: 'icon-star',
        badge: {
          variant: 'success',
          text: 'NEW'
        }
      },
      {
        name: 'Flags',
        url: '/icons/flags',
        icon: 'icon-star'
      },
      {
        name: 'Font Awesome',
        url: '/icons/font-awesome',
        icon: 'icon-star',
        badge: {
          variant: 'secondary',
          text: '4.7'
        }
      },
      {
        name: 'Simple Line Icons',
        url: '/icons/simple-line-icons',
        icon: 'icon-star'
      }
    ]
  },
  {
    name: 'Notifications',
    url: '/notifications',
    icon: 'icon-bell',
    children: [
      {
        name: 'Alerts',
        url: '/notifications/alerts',
        icon: 'icon-bell'
      },
      {
        name: 'Badges',
        url: '/notifications/badges',
        icon: 'icon-bell'
      },
      {
        name: 'Modals',
        url: '/notifications/modals',
        icon: 'icon-bell'
      }
    ]
  },
  {
    name: 'Widgets',
    url: '/widgets',
    icon: 'icon-calculator',
    badge: {
      variant: 'info',
      text: 'NEW'
    }
  },
  {
    divider: true
  },
  {
    title: true,
    name: 'Extras',
  },
  {
    name: 'Pages',
    url: '/pages',
    icon: 'icon-star',
    children: [
      {
        name: 'Login',
        url: '/login',
        icon: 'icon-star'
      },
      {
        name: 'Register',
        url: '/register',
        icon: 'icon-star'
      },
      {
        name: 'Error 404',
        url: '/404',
        icon: 'icon-star'
      },
      {
        name: 'Error 500',
        url: '/500',
        icon: 'icon-star'
      }
    ]
  },
  {
    name: 'Disabled',
    url: '/dashboard',
    icon: 'icon-ban',
    badge: {
      variant: 'secondary',
      text: 'NEW'
    },
    attributes: { disabled: true },
  },
  {
    name: 'Download CoreUI',
    url: 'http://coreui.io/angular/',
    icon: 'icon-cloud-download',
    class: 'mt-auto',
    variant: 'success',
    attributes: { target: '_blank', rel: 'noopener' }
  },
  {
    name: 'Try CoreUI PRO',
    url: 'http://coreui.io/pro/angular/',
    icon: 'icon-layers',
    variant: 'danger',
    attributes: { target: '_blank', rel: 'noopener' }
  }*/
];
