import React, { useState } from 'react';
import { View } from 'react-native';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { Tag } from 'primereact/tag';
import { Toolbar } from 'primereact/toolbar';
import { FilterMatchMode } from 'primereact/api';
import { Avatar } from 'primereact/avatar';
import { Dropdown } from 'primereact/dropdown';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  avatar: string;
  lastActive: string;
}

export default function UsersPage() {
  const [users] = useState<User[]>([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', avatar: 'JD', lastActive: '2 hours ago' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'Active', avatar: 'JS', lastActive: '5 minutes ago' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Viewer', status: 'Inactive', avatar: 'BJ', lastActive: '2 days ago' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Editor', status: 'Active', avatar: 'AB', lastActive: '1 hour ago' },
    { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Admin', status: 'Active', avatar: 'CW', lastActive: '30 minutes ago' },
  ]);

  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [userDialog, setUserDialog] = useState(false);
  const [deleteUserDialog, setDeleteUserDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [filters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    email: { value: null, matchMode: FilterMatchMode.CONTAINS },
    role: { value: null, matchMode: FilterMatchMode.EQUALS },
    status: { value: null, matchMode: FilterMatchMode.EQUALS },
  });

  const roles = [
    { label: 'Admin', value: 'Admin' },
    { label: 'Editor', value: 'Editor' },
    { label: 'Viewer', value: 'Viewer' },
  ];

  const statuses = [
    { label: 'Active', value: 'Active' },
    { label: 'Inactive', value: 'Inactive' },
  ];

  const onGlobalFilterChange = (e: any) => {
    const value = e.target.value;
    setGlobalFilterValue(value);
  };

  const leftToolbarTemplate = () => {
    return (
      <div className="flex gap-2">
        <Button label="New" icon="pi pi-plus" className="p-button-success" onClick={() => setUserDialog(true)} />
        <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={() => setDeleteUserDialog(true)} disabled={!selectedUsers || !selectedUsers.length} />
      </div>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <div className="flex gap-2">
        <Button icon="pi pi-file-excel" className="p-button-help" tooltip="Export to Excel" />
        <Button icon="pi pi-file-pdf" className="p-button-warning" tooltip="Export to PDF" />
      </div>
    );
  };

  const nameBodyTemplate = (rowData: User) => {
    return (
      <div className="flex align-items-center gap-2">
        <Avatar label={rowData.avatar} size="normal" shape="circle" style={{ backgroundColor: '#2196F3', color: '#ffffff' }} />
        <span>{rowData.name}</span>
      </div>
    );
  };

  const statusBodyTemplate = (rowData: User) => {
    return <Tag value={rowData.status} severity={rowData.status === 'Active' ? 'success' : 'warning'} />;
  };

  const roleBodyTemplate = (rowData: User) => {
    const severity = {
      'Admin': 'danger',
      'Editor': 'info',
      'Viewer': 'warning'
    }[rowData.role] || 'info';
    
    return <Tag value={rowData.role} severity={severity as any} />;
  };

  const actionBodyTemplate = (rowData: User) => {
    return (
      <div className="flex gap-2">
        <Button icon="pi pi-pencil" className="p-button-rounded p-button-text p-button-warning" onClick={() => editUser(rowData)} />
        <Button icon="pi pi-trash" className="p-button-rounded p-button-text p-button-danger" onClick={() => confirmDeleteUser(rowData)} />
      </div>
    );
  };

  const editUser = (user: User) => {
    setSelectedUser(user);
    setUserDialog(true);
  };

  const confirmDeleteUser = (user: User) => {
    setSelectedUser(user);
    setDeleteUserDialog(true);
  };

  const hideDialog = () => {
    setUserDialog(false);
    setSelectedUser(null);
  };

  const hideDeleteUserDialog = () => {
    setDeleteUserDialog(false);
    setSelectedUser(null);
  };

  const header = (
    <div className="flex justify-content-between">
      <h2 className="m-0">Manage Users</h2>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Search users..." />
      </span>
    </div>
  );

  const userDialogFooter = (
    <>
      <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
      <Button label="Save" icon="pi pi-check" onClick={hideDialog} />
    </>
  );

  const deleteUserDialogFooter = (
    <>
      <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteUserDialog} />
      <Button label="Yes" icon="pi pi-check" className="p-button-danger" onClick={hideDeleteUserDialog} />
    </>
  );

  return (
    <div className="users-page">
      <div className="page-header mb-4">
        <h1 className="text-3xl font-bold">Users Management</h1>
        <p className="text-gray-600">Manage user accounts and permissions</p>
      </div>

      <div className="card">
        <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate} />
        
        <DataTable 
          value={users} 
          selection={selectedUsers}
          onSelectionChange={(e) => setSelectedUsers(e.value)}
          dataKey="id"
          paginator 
          rows={10} 
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users"
          filters={filters}
          filterDisplay="row"
          globalFilterFields={['name', 'email', 'role', 'status']}
          header={header}
          responsiveLayout="scroll"
        >
          <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} />
          <Column field="name" header="Name" body={nameBodyTemplate} sortable filter filterPlaceholder="Search by name" />
          <Column field="email" header="Email" sortable filter filterPlaceholder="Search by email" />
          <Column field="role" header="Role" body={roleBodyTemplate} sortable filter filterElement={(options) => <Dropdown value={options.value} options={roles} onChange={(e) => options.filterCallback(e.value)} placeholder="Select Role" className="p-column-filter" />} />
          <Column field="status" header="Status" body={statusBodyTemplate} sortable filter filterElement={(options) => <Dropdown value={options.value} options={statuses} onChange={(e) => options.filterCallback(e.value)} placeholder="Select Status" className="p-column-filter" />} />
          <Column field="lastActive" header="Last Active" sortable />
          <Column body={actionBodyTemplate} header="Actions" exportable={false} style={{ minWidth: '8rem' }} />
        </DataTable>
      </div>

      <Dialog visible={userDialog} style={{ width: '450px' }} header="User Details" modal className="p-fluid" footer={userDialogFooter} onHide={hideDialog}>
        <div className="field">
          <label htmlFor="name">Name</label>
          <InputText id="name" value={selectedUser?.name || ''} required autoFocus />
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <InputText id="email" value={selectedUser?.email || ''} required />
        </div>
        <div className="field">
          <label htmlFor="role">Role</label>
          <Dropdown id="role" value={selectedUser?.role} options={roles} placeholder="Select a Role" />
        </div>
        <div className="field">
          <label htmlFor="status">Status</label>
          <Dropdown id="status" value={selectedUser?.status} options={statuses} placeholder="Select a Status" />
        </div>
      </Dialog>

      <Dialog visible={deleteUserDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteUserDialogFooter} onHide={hideDeleteUserDialog}>
        <div className="confirmation-content">
          <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
          {selectedUser && <span>Are you sure you want to delete <b>{selectedUser.name}</b>?</span>}
        </div>
      </Dialog>
    </div>
  );
}