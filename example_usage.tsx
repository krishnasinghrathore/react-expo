import React, { useState } from 'react'
import { YStack, XStack, Button, Input, H2, H4 } from 'tamagui'
import { DataTable, Dialog, Calendar, FormField, MultiSelect, Toast } from './tamagui_primereact_components'

// Sample data
const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Inactive' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Active' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Editor', status: 'Active' },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'User', status: 'Inactive' },
]

const UserManagement = () => {
  const [selectedUsers, setSelectedUsers] = useState<any[]>([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [skills, setSkills] = useState<string[]>([])
  const [showToast, setShowToast] = useState(false)

  const columns = [
    { field: 'name', header: 'Name', sortable: true },
    { field: 'email', header: 'Email', sortable: true },
    { field: 'role', header: 'Role', sortable: true },
    { field: 'status', header: 'Status', sortable: true },
  ]

  const skillOptions = [
    { label: 'React', value: 'react' },
    { label: 'TypeScript', value: 'typescript' },
    { label: 'Node.js', value: 'nodejs' },
    { label: 'Python', value: 'python' },
  ]

  const handleSave = () => {
    setShowToast(true)
    setDialogOpen(false)
    // Save logic here
  }

  return (
    <YStack f={1} p="$4" gap="$6">
      <H2>User Management System</H2>

      {/* Action Buttons */}
      <XStack gap="$3">
        <Button onPress={() => setDialogOpen(true)}>
          Add New User
        </Button>
        <Button 
          variant="outlined" 
          disabled={selectedUsers.length === 0}
          onPress={() => console.log('Delete selected:', selectedUsers)}
        >
          Delete Selected ({selectedUsers.length})
        </Button>
      </XStack>

      {/* Data Table */}
      <YStack>
        <H4>Users</H4>
        <DataTable
          data={users}
          columns={columns}
          paginator
          rows={3}
          selection={selectedUsers}
          onSelectionChange={setSelectedUsers}
          emptyMessage="No users found"
          scrollable
        />
      </YStack>

      {/* Add User Dialog */}
      <Dialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title="Add New User"
        width={500}
        footer={
          <XStack gap="$3">
            <Button variant="outlined" onPress={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onPress={handleSave}>
              Save User
            </Button>
          </XStack>
        }
      >
        <YStack gap="$4">
          <FormField label="Full Name" required>
            <Input placeholder="Enter full name" />
          </FormField>
          
          <FormField label="Email Address" required>
            <Input placeholder="Enter email" />
          </FormField>
          
          <FormField label="Start Date">
            <Calendar
              value={selectedDate}
              onChange={setSelectedDate}
              placeholder="Select start date"
            />
          </FormField>
          
          <FormField label="Skills" helpText="Select relevant skills">
            <MultiSelect
              options={skillOptions}
              value={skills}
              onChange={setSkills}
              placeholder="Select skills"
            />
          </FormField>
        </YStack>
      </Dialog>

      {/* Toast Notification */}
      {showToast && (
        <Toast
          type="success"
          title="User Added!"
          message="The new user has been successfully added to the system"
          duration={3000}
          onClose={() => setShowToast(false)}
        />
      )}
    </YStack>
  )
}

export default UserManagement