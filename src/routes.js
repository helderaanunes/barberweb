import React from 'react'
const DashboardCliente = React.lazy(() => import('./views/cliente/Dashboard'))
const DashboardServico = React.lazy(() => import('./views/servico/Dashboard'))
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))

// Base
const Accordion = React.lazy(() => import('./views/base/accordion/Accordion'))
const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'))
const Cards = React.lazy(() => import('./views/base/cards/Cards'))
const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'))
const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'))
const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'))
const Navs = React.lazy(() => import('./views/base/navs/Navs'))
const Paginations = React.lazy(() => import('./views/base/paginations/Paginations'))
const Placeholders = React.lazy(() => import('./views/base/placeholders/Placeholders'))
const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'))
const Progress = React.lazy(() => import('./views/base/progress/Progress'))
const Spinners = React.lazy(() => import('./views/base/spinners/Spinners'))
const Tables = React.lazy(() => import('./views/base/tables/Tables'))
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'))

// Buttons
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'))
const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'))
const Dropdowns = React.lazy(() => import('./views/buttons/dropdowns/Dropdowns'))

//Forms
const ChecksRadios = React.lazy(() => import('./views/forms/checks-radios/ChecksRadios'))
const FloatingLabels = React.lazy(() => import('./views/forms/floating-labels/FloatingLabels'))
const FormControl = React.lazy(() => import('./views/forms/form-control/FormControl'))
const InputGroup = React.lazy(() => import('./views/forms/input-group/InputGroup'))
const Layout = React.lazy(() => import('./views/forms/layout/Layout'))
const Range = React.lazy(() => import('./views/forms/range/Range'))
const Select = React.lazy(() => import('./views/forms/select/Select'))
const Validation = React.lazy(() => import('./views/forms/validation/Validation'))

const Charts = React.lazy(() => import('./views/charts/Charts'))

// Icons
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'))
const Flags = React.lazy(() => import('./views/icons/flags/Flags'))
const Brands = React.lazy(() => import('./views/icons/brands/Brands'))

// Notifications
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'))
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'))
const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'))

const Widgets = React.lazy(() => import('./views/widgets/Widgets'))
const OrdemServicoAdd = React.lazy(() => import('./views/ordemServico/Add'))
const OrdemServicoList = React.lazy(() => import('./views/ordemServico/List'))

const ProdutoAdd = React.lazy(() => import('./views/produto/Add'))
const ProdutoListar = React.lazy(() => import('./views/produto/Listar'))

const CategoriaAdd = React.lazy(() => import('./views/categoria/Add'))
const CategoriaDashboard = React.lazy(() => import('./views/categoria/Dashboard'))


const ServicoAdd = React.lazy(() => import('./views/servico/Add.js'))
const ServicoList = React.lazy(() => import('./views/servico/List.js'))

const UsuarioAdd = React.lazy(() => import('./views/usuario/Add'))
const UsuarioListar = React.lazy(() => import('./views/usuario/Listar'))

const AgendaAdd = React.lazy(() => import('./views/agendamento/AgendaAdd'))
const AgendaListar = React.lazy(() => import('./views/agendamento/AgendaListar'))

const VendaList = React.lazy(() => import('./views/venda/List'))
const VendaAdd = React.lazy(() => import('./views/venda/Add'))
const CategoriaList = React.lazy(() => import('./views/categoria/List'))
const FluxoFinanceiroList = React.lazy(() => import('./views/fluxoFinanceiro/List'))
const FluxoFinanceiroAdd = React.lazy(() => import('./views/fluxoFinanceiro/Add'))
const ClienteAdd = React.lazy(() => import('./views/cliente/Add'))
const ClienteList = React.lazy(() => import('./views/cliente/List'))

const routes = [
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },

  { path: '/ordemServico/add', name: 'Adicionar Ordem Serviço', element: OrdemServicoAdd },
  { path: '/ordemServico/list', name: 'Listar Ordem Serviço', element: OrdemServicoList },

  { path: '/categoria/list', name: 'Listar Categoria', element: CategoriaList },
  { path: '/fluxoFinanceiro/list', name: 'Listar Fluxo Financeiro', element: FluxoFinanceiroList },
  { path: '/fluxoFinanceiro/edit/:id', name: 'Editar Fluxo Financeiro', element: FluxoFinanceiroAdd }, // Nova rota para edição
  { path: '/categoria/add', name: 'Adicionar Categoria', element: CategoriaAdd },
  { path: '/categoria/dashboard', name: 'Dashboard Categoria', element: CategoriaDashboard },
  { path: '/categoria/edit/:id', name: 'Editar Categoria', element: CategoriaAdd }, // Nova rota para edição


  { path: '/produto/Add', name: 'Adicionar Produto', element: ProdutoAdd },
  { path: '/produto/Listar', name: 'Listar Produtos', element: ProdutoListar },
  { path: '/produto/edit/:id', name: 'Editar Produto', element: ProdutoAdd }, // Nova rota para edição

  { path: '/usuario/add', name: 'Adicionar Usuario', element: UsuarioAdd },
  { path: '/usuario/list', name: 'Listar Usuarios', element: UsuarioListar },

  { path: '/agendamento/agenda_add', name: 'Agendar', element: AgendaAdd },
  { path: '/agendamento/agenda_list', name: 'Agenda completa', element: AgendaListar },

  { path: '/venda/Add', name: 'Adicionar Venda', element: VendaAdd },
  { path: '/venda/List', name: 'Listar Vendas', element: VendaList },
  { path: '/cliente/add', name: 'Adicionar Cliente', element: ClienteAdd },
  { path: '/cliente/dashboard', name: 'Dashboard Cliente', element: DashboardCliente },
  { path: '/cliente/list', name: 'Listar Clientes', element: ClienteList },
  { path: '/fluxoFinanceiro/add', name: 'Adicionar FluxoFinanceiro', element: FluxoFinanceiroAdd },
  { path: '/fluxoFinaceiro/list', name: 'Listar FluxoFinanceiro', element: FluxoFinanceiroList },
  { path: '/Servico/add', name: 'Adicionar Serviço', element: ServicoAdd },
  { path: '/servico/edit/:id', name: 'Editar Serviço', element: ServicoAdd },
  { path: '/servico/dashboard', name: 'Dashboard Serviços', element: DashboardServico },
  { path: '/Servico/list', name: 'Listar Serviço', element: ServicoList },
  { path: '/theme', name: 'Theme', element: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', element: Colors },
  { path: '/theme/typography', name: 'Typography', element: Typography },
  { path: '/base', name: 'Base', element: Cards, exact: true },
  { path: '/base/accordion', name: 'Accordion', element: Accordion },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', element: Breadcrumbs },
  { path: '/base/cards', name: 'Cards', element: Cards },
  { path: '/base/carousels', name: 'Carousel', element: Carousels },
  { path: '/base/collapses', name: 'Collapse', element: Collapses },
  { path: '/base/list-groups', name: 'List Groups', element: ListGroups },
  { path: '/base/navs', name: 'Navs', element: Navs },
  { path: '/base/paginations', name: 'Paginations', element: Paginations },
  { path: '/base/placeholders', name: 'Placeholders', element: Placeholders },
  { path: '/base/popovers', name: 'Popovers', element: Popovers },
  { path: '/base/progress', name: 'Progress', element: Progress },
  { path: '/base/spinners', name: 'Spinners', element: Spinners },
  { path: '/base/tables', name: 'Tables', element: Tables },
  { path: '/base/tooltips', name: 'Tooltips', element: Tooltips },
  { path: '/buttons', name: 'Buttons', element: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', element: Buttons },
  { path: '/buttons/dropdowns', name: 'Dropdowns', element: Dropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', element: ButtonGroups },
  { path: '/charts', name: 'Charts', element: Charts },
  { path: '/forms', name: 'Forms', element: FormControl, exact: true },
  { path: '/forms/form-control', name: 'Form Control', element: FormControl },
  { path: '/forms/select', name: 'Select', element: Select },
  { path: '/forms/checks-radios', name: 'Checks & Radios', element: ChecksRadios },
  { path: '/forms/range', name: 'Range', element: Range },
  { path: '/forms/input-group', name: 'Input Group', element: InputGroup },
  { path: '/forms/floating-labels', name: 'Floating Labels', element: FloatingLabels },
  { path: '/forms/layout', name: 'Layout', element: Layout },
  { path: '/forms/validation', name: 'Validation', element: Validation },
  { path: '/icons', exact: true, name: 'Icons', element: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', element: Flags },
  { path: '/icons/brands', name: 'Brands', element: Brands },
  { path: '/notifications', name: 'Notifications', element: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', element: Alerts },
  { path: '/notifications/badges', name: 'Badges', element: Badges },
  { path: '/notifications/modals', name: 'Modals', element: Modals },
  { path: '/notifications/toasts', name: 'Toasts', element: Toasts },
  { path: '/widgets', name: 'Widgets', element: Widgets },
]

export default routes
