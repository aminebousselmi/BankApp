import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
    
    {
        path: '/dashboard/dashboard', title: 'Dashboard', icon: 'mdi mdi-gauge', class: '', label: '', labelClass: '', extralink: false,
        submenu: []
    },
    {
        path: '', title: 'Manage Agency', icon: 'mdi mdi-apps', class: 'has-arrow', label: '', labelClass: '', extralink: false,
        submenu: [
            { path: '/manageAgency/normalOperation', title: 'Normal Operations', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
            { path: '/manageAgency/currency', title: 'Currency', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
            { path: '/manageAgency/check', title: 'Check', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
            { path: '/manageAgency/account', title: 'Account Management', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
            { path: '/manageAgency/Customer', title: 'Customer Management', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
            { path: '/manageAgency/Employee', title: 'Employee Management', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },

        ]
    },
    {
        path: '', title: 'Other Services', icon: '', class: 'nav-small-cap', label: '', labelClass: '', extralink: true, submenu: []
    },
    {
        path: '/tasks/todo', title: 'TaskBoard', icon: 'mdi mdi-dropbox', class: '', label: '', labelClass: '', extralink: false,
        submenu: [
        ]
        
    } ,
    {
        path: '/instant/message', title: 'Message Instant', icon: 'mdi mdi-brush', class: '', label: '', labelClass: '', extralink: false,
        submenu: [
        ],
        
    }    
];

