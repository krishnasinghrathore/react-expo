import React, { useState } from 'react'
import { YStack, XStack, Button, Badge, H3, H4, ScrollView } from 'tamagui'
import { NestedDataTable, NestedColumn } from './advanced_tamagui_components'
import { Eye, Edit, Trash2, Plus, Package, Users, DollarSign } from '@tamagui/lucide-icons'

const NestedTableExample = () => {
  const [selectedItems, setSelectedItems] = useState<any[]>([])
  const [globalFilter, setGlobalFilter] = useState('')

  // Sample hierarchical data
  const hierarchicalData = [
    {
      id: 1,
      name: 'Electronics',
      type: 'category',
      status: 'Active',
      totalItems: 45,
      totalValue: 25000,
      children: [
        {
          id: 11,
          name: 'Laptops',
          type: 'subcategory',
          status: 'Active',
          totalItems: 15,
          totalValue: 18000,
          children: [
            { id: 111, name: 'MacBook Pro', type: 'product', status: 'Active', stock: 5, price: 2500 },
            { id: 112, name: 'Dell XPS', type: 'product', status: 'Active', stock: 8, price: 1800 },
            { id: 113, name: 'ThinkPad', type: 'product', status: 'Low Stock', stock: 2, price: 1200 },
          ]
        },
        {
          id: 12,
          name: 'Accessories',
          type: 'subcategory',
          status: 'Active',
          totalItems: 30,
          totalValue: 7000,
          children: [
            { id: 121, name: 'Wireless Mouse', type: 'product', status: 'Active', stock: 25, price: 50 },
            { id: 122, name: 'Keyboard', type: 'product', status: 'Active', stock: 20, price: 120 },
            { id: 123, name: 'Monitor', type: 'product', status: 'Active', stock: 12, price: 300 },
          ]
        }
      ]
    },
    {
      id: 2,
      name: 'Clothing',
      type: 'category',
      status: 'Active',
      totalItems: 120,
      totalValue: 15000,
      children: [
        {
          id: 21,
          name: 'T-Shirts',
          type: 'subcategory',
          status: 'Active',
          totalItems: 60,
          totalValue: 3000,
          children: [
            { id: 211, name: 'Cotton T-Shirt', type: 'product', status: 'Active', stock: 50, price: 25 },
            { id: 212, name: 'Polo Shirt', type: 'product', status: 'Active', stock: 30, price: 45 },
          ]
        },
        {
          id: 22,
          name: 'Pants',
          type: 'subcategory',
          status: 'Active',
          totalItems: 60,
          totalValue: 12000,
          children: [
            { id: 221, name: 'Jeans', type: 'product', status: 'Active', stock: 40, price: 80 },
            { id: 222, name: 'Khakis', type: 'product', status: 'Low Stock', stock: 5, price: 60 },
          ]
        }
      ]
    },
    {
      id: 3,
      name: 'Books',
      type: 'category',
      status: 'Inactive',
      totalItems: 200,
      totalValue: 8000,
      children: [
        {
          id: 31,
          name: 'Technical Books',
          type: 'subcategory',
          status: 'Active',
          totalItems: 80,
          totalValue: 4000,
          children: [
            { id: 311, name: 'React Handbook', type: 'product', status: 'Active', stock: 25, price: 35 },
            { id: 312, name: 'Node.js Guide', type: 'product', status: 'Active', stock: 20, price: 40 },
          ]
        }
      ]
    }
  ]

  const columns: NestedColumn[] = [
    {
      field: 'name',
      header: 'Name',
      sortable: true,
      expandable: true,
      width: 300,
      render: (value, row) => (
        <XStack ai="center" gap="$2">
          {row.type === 'category' && <Package size={16} color="$blue10" />}
          {row.type === 'subcategory' && <Users size={16} color="$green10" />}
          {row.type === 'product' && <DollarSign size={16} color="$purple10" />}
          <YStack>
            <span style={{ fontWeight: row.type === 'product' ? 'normal' : '600' }}>
              {value}
            </span>
            <span style={{ fontSize: '12px', color: '#666' }}>
              {row.type}
            </span>
          </YStack>
        </XStack>
      )
    },
    {
      field: 'status',
      header: 'Status',
      sortable: true,
      width: 120,
      render: (value) => (
        <Badge variant={
          value === 'Active' ? 'green' : 
          value === 'Low Stock' ? 'yellow' : 
          'red'
        }>
          {value}
        </Badge>
      )
    },
    {
      field: 'totalItems',
      header: 'Items',
      sortable: true,
      width: 100,
      render: (value, row) => (
        <span>
          {row.type === 'product' ? row.stock : value}
        </span>
      )
    },
    {
      field: 'totalValue',
      header: 'Value',
      sortable: true,
      width: 120,
      render: (value, row) => (
        <span style={{ fontWeight: '600' }}>
          ${row.type === 'product' ? row.price : value?.toLocaleString()}
        </span>
      )
    },
    {
      field: 'actions',
      header: 'Actions',
      width: 150,
      render: (_, row) => (
        <XStack gap="$2">
          <Button size="$2" icon={<Eye size={14} />} variant="ghost" />
          <Button size="$2" icon={<Edit size={14} />} variant="ghost" />
          <Button size="$2" icon={<Trash2 size={14} />} variant="ghost" />
          {row.type === 'category' && (
            <Button size="$2" icon={<Plus size={14} />} variant="ghost" />
          )}
        </XStack>
      )
    }
  ]

  return (
    <ScrollView f={1} p="$4">
      <YStack gap="$4">
        <H3>Nested Product Catalog</H3>
        
        {/* Stats Cards */}
        <XStack gap="$4" flexWrap="wrap">
          <YStack bg="$blue2" p="$3" br="$4" f={1} minWidth={200}>
            <H4 color="$blue11">Total Categories</H4>
            <span style={{ fontSize: '24px', fontWeight: 'bold' }}>3</span>
          </YStack>
          <YStack bg="$green2" p="$3" br="$4" f={1} minWidth={200}>
            <H4 color="$green11">Total Products</H4>
            <span style={{ fontSize: '24px', fontWeight: 'bold' }}>365</span>
          </YStack>
          <YStack bg="$purple2" p="$3" br="$4" f={1} minWidth={200}>
            <H4 color="$purple11">Total Value</H4>
            <span style={{ fontSize: '24px', fontWeight: 'bold' }}>$48,000</span>
          </YStack>
        </XStack>

        {/* Nested Table */}
        <NestedDataTable
          data={hierarchicalData}
          columns={columns}
          childrenField="children"
          selection={selectedItems}
          onSelectionChange={setSelectedItems}
          globalFilter={globalFilter}
          onGlobalFilterChange={setGlobalFilter}
          expandable
          exportable
          resizableColumns
          editMode="cell"
          onCellEdit={(row, field, value) => {
            console.log('Editing:', row.name, field, value)
          }}
          size="normal"
          density="comfortable"
          showGridlines
          stripedRows
          scrollHeight={600}
          emptyMessage="No items found"
          defaultExpandedRows={[1, 2]} // Expand first two categories by default
        />

        {/* Selection Info */}
        {selectedItems.length > 0 && (
          <XStack ai="center" gap="$3" p="$3" bg="$blue2" br="$4">
            <span style={{ fontWeight: '600' }}>
              Selected: {selectedItems.length} items
            </span>
            <Button size="$3" variant="outlined">
              Bulk Edit
            </Button>
            <Button size="$3" variant="outlined">
              Delete Selected
            </Button>
          </XStack>
        )}
      </YStack>
    </ScrollView>
  )
}

export default NestedTableExample