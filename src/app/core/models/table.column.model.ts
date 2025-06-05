// level-management-columns.ts

import { MtxGridColumn } from '@ng-matero/extensions/grid';

export const LEVEL_TABLE_COLUMNS: MtxGridColumn[] = [
    { header: 'ID', field: 'id' },
    { header: 'Name', field: 'name' },
    { header: 'Level', field: 'level', sortable: true },
    {
        header: 'Edit',
        field: 'edit',
        type: 'button',
        pinned: 'right',
        buttons: [
            {
                icon: 'edit',
                type: 'icon',
                tooltip: 'Edit',
                click: (record: any) => { },
            },
        ]
    },
    {
        header: 'Delete',
        field: 'delete',
        type: 'button',
        pinned: 'left',
        buttons: [
            {
                icon: 'delete',
                type: 'icon',
                tooltip: 'Delete',
                click: (record: any) => { },
            }
        ]
    },
];

export const MODULE_TABLE_COLUMNS: MtxGridColumn[] = [
    { header: 'ID', field: 'id', sortable: true },
    { header: 'Name', field: 'name' },
    { header: 'Description', field: 'description' },
    {
        header: 'Edit',
        field: 'edit',
        type: 'button',
        pinned: 'right',
        buttons: [
            {
                icon: 'edit',
                type: 'icon',
                tooltip: 'Edit',
                click: (record: any) => { },
            },
        ]
    },
    {
        header: 'Delete',
        field: 'delete',
        type: 'button',
        pinned: 'left',
        buttons: [
            {
                icon: 'delete',
                type: 'icon',
                tooltip: 'Delete',
                click: (record: any) => { },
            }
        ]
    },
];

export const ROLE_TABLE_COLUMNS: MtxGridColumn[] = [
    { header: 'ID', field: 'id', sortable: true },
    { header: 'Name', field: 'name' },
    { header: 'Level', field: 'level' },
    {
        header: 'Status',
        field: 'status',
        type: 'button',
        buttons: [
            {
                icon: 'add',
                type: 'icon',
                tooltip: 'Edit Permission',
                click: (record: any) => { },
            },
        ]
    },
    {
        header: 'Edit',
        field: 'edit',
        type: 'button',
        pinned: 'right',
        buttons: [
            {
                icon: 'edit',
                type: 'icon',
                tooltip: 'Edit',
                click: (record: any) => { },
            },
        ]
    },
    {
        header: 'Delete',
        field: 'delete',
        type: 'button',
        pinned: 'left',
        buttons: [
            {
                icon: 'delete',
                type: 'icon',
                tooltip: 'Delete',
                click: (record: any) => { },
            }
        ]
    },
];

export const USER_TABLE_COLUMNS: MtxGridColumn[] = [
    { header: 'ID', field: 'id', sortable: true },
    { header: 'Name', field: 'name' },
    { header: 'Email', field: 'email' },
    { header: 'Mobile', field: 'mobile', sortable: true },
    { header: 'Role', field: 'role' },
    { header: 'UserId', field: 'userId' },
    { header: 'UserType', field: 'user_type' },
    {
        header: 'Edit',
        field: 'edit',
        type: 'button',
        pinned: 'right',
        buttons: [
            {
                icon: 'edit',
                type: 'icon',
                tooltip: 'Edit',
                click: (record: any) => { },
            },
        ]
    },
    {
        header: 'Delete',
        field: 'delete',
        type: 'button',
        pinned: 'left',
        buttons: [
            {
                icon: 'delete',
                type: 'icon',
                tooltip: 'Delete',
                click: (record: any) => { },
            }
        ]
    },
];