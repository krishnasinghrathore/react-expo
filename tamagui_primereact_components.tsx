import React, { useState, useMemo } from 'react'
import {
  YStack,
  XStack,
  Text,
  Button,
  Input,
  ScrollView,
  Sheet,
  Dialog,
  Select,
  Checkbox,
  RadioGroup,
  Separator,
  Card,
  Avatar,
  Badge,
  Progress,
  Switch,
  Slider,
  Adapt,
  AlertDialog,
  Popover,
  styled,
  useTheme,
  H3,
  H4,
  Paragraph,
  Circle,
  Square,
  AnimatePresence
} from 'tamagui'
import { ChevronDown, ChevronUp, Search, Filter, Calendar, X, Plus, Edit, Trash2, Eye, Download, Upload, Settings, Check, AlertCircle, Info } from '@tamagui/lucide-icons'

// =============================================================================
// DATA TABLE COMPONENT (Like PrimeReact DataTable)
// =============================================================================

interface Column {
  field: string
  header: string
  sortable?: boolean
  width?: number
  render?: (value: any, row: any) => React.ReactNode
}

interface DataTableProps {
  data: any[]
  columns: Column[]
  paginator?: boolean
  rows?: number
  sortField?: string
  sortOrder?: 'asc' | 'desc'
  globalFilter?: string
  selection?: any[]
  onSelectionChange?: (selection: any[]) => void
  loading?: boolean
  emptyMessage?: string
  scrollable?: boolean
  onRowSelect?: (row: any) => void
}

const DataTable: React.FC<DataTableProps> = ({
  data,
  columns,
  paginator = false,
  rows = 10,
  sortField,
  sortOrder = 'asc',
  globalFilter = '',
  selection = [],
  onSelectionChange,
  loading = false,
  emptyMessage = 'No data available',
  scrollable = true,
  onRowSelect
}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [sortConfig, setSortConfig] = useState<{field: string, order: 'asc' | 'desc'} | null>(
    sortField ? { field: sortField, order: sortOrder } : null
  )

  // Filter and sort data
  const processedData = useMemo(() => {
    let filtered = data

    // Global filter
    if (globalFilter) {
      filtered = filtered.filter(row =>
        columns.some(col => 
          String(row[col.field]).toLowerCase().includes(globalFilter.toLowerCase())
        )
      )
    }

    // Sort
    if (sortConfig) {
      filtered.sort((a, b) => {
        const aValue = a[sortConfig.field]
        const bValue = b[sortConfig.field]
        
        if (aValue < bValue) return sortConfig.order === 'asc' ? -1 : 1
        if (aValue > bValue) return sortConfig.order === 'asc' ? 1 : -1
        return 0
      })
    }

    return filtered
  }, [data, globalFilter, sortConfig, columns])

  // Pagination
  const totalPages = Math.ceil(processedData.length / rows)
  const paginatedData = paginator 
    ? processedData.slice((currentPage - 1) * rows, currentPage * rows)
    : processedData

  const handleSort = (field: string) => {
    setSortConfig(prev => ({
      field,
      order: prev?.field === field && prev.order === 'asc' ? 'desc' : 'asc'
    }))
  }

  const handleRowSelect = (row: any) => {
    if (onSelectionChange) {
      const isSelected = selection.some(item => item.id === row.id)
      if (isSelected) {
        onSelectionChange(selection.filter(item => item.id !== row.id))
      } else {
        onSelectionChange([...selection, row])
      }
    }
    onRowSelect?.(row)
  }

  const selectAll = () => {
    if (onSelectionChange) {
      const allSelected = selection.length === processedData.length
      onSelectionChange(allSelected ? [] : processedData)
    }
  }

  return (
    <YStack f={1} bg="$background" br="$4" overflow="hidden">
      {/* Header */}
      <XStack bg="$gray2" p="$3" ai="center" jc="space-between" bw={1} bc="$borderColor">
        {onSelectionChange && (
          <XStack ai="center" gap="$2">
            <Checkbox 
              checked={selection.length === processedData.length && processedData.length > 0}
              onCheckedChange={selectAll}
            />
            <Text fontSize="$3" color="$gray10">
              {selection.length} selected
            </Text>
          </XStack>
        )}
        <XStack ai="center" gap="$2">
          <Text fontSize="$3" color="$gray10">
            Total: {processedData.length} items
          </Text>
        </XStack>
      </XStack>

      {/* Table */}
      <ScrollView horizontal={scrollable} showsHorizontalScrollIndicator={false}>
        <YStack f={1} minWidth="100%">
          {/* Column Headers */}
          <XStack bg="$gray3" bw={1} bc="$borderColor" btw={0}>
            {onSelectionChange && (
              <XStack w={50} ai="center" jc="center" p="$2">
                <Checkbox 
                  checked={selection.length === processedData.length && processedData.length > 0}
                  onCheckedChange={selectAll}
                />
              </XStack>
            )}
            {columns.map((column, index) => (
              <XStack
                key={column.field}
                f={1}
                ai="center"
                jc="space-between"
                p="$3"
                bbw={1}
                bc="$borderColor"
                brw={index < columns.length - 1 ? 1 : 0}
                pressStyle={{ bg: '$gray4' }}
                onPress={() => column.sortable && handleSort(column.field)}
                cursor={column.sortable ? 'pointer' : 'default'}
                minWidth={column.width || 150}
              >
                <Text fontSize="$4" fontWeight="600" color="$gray12">
                  {column.header}
                </Text>
                {column.sortable && (
                  <YStack>
                    {sortConfig?.field === column.field ? (
                      sortConfig.order === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                    ) : (
                      <ChevronDown size={16} opacity={0.5} />
                    )}
                  </YStack>
                )}
              </XStack>
            ))}
          </XStack>

          {/* Data Rows */}
          {loading ? (
            <YStack f={1} ai="center" jc="center" p="$8">
              <Progress size="$4" />
              <Text mt="$2" color="$gray10">Loading...</Text>
            </YStack>
          ) : paginatedData.length === 0 ? (
            <YStack f={1} ai="center" jc="center" p="$8">
              <Text color="$gray10" fontSize="$4">{emptyMessage}</Text>
            </YStack>
          ) : (
            paginatedData.map((row, rowIndex) => (
              <XStack
                key={row.id || rowIndex}
                bbw={1}
                bc="$borderColor"
                hoverStyle={{ bg: '$gray2' }}
                pressStyle={{ bg: '$gray3' }}
                onPress={() => handleRowSelect(row)}
                cursor="pointer"
              >
                {onSelectionChange && (
                  <XStack w={50} ai="center" jc="center" p="$2">
                    <Checkbox 
                      checked={selection.some(item => item.id === row.id)}
                      onCheckedChange={() => handleRowSelect(row)}
                    />
                  </XStack>
                )}
                {columns.map((column, colIndex) => (
                  <XStack
                    key={`${rowIndex}-${column.field}`}
                    f={1}
                    ai="center"
                    p="$3"
                    brw={colIndex < columns.length - 1 ? 1 : 0}
                    bc="$borderColor"
                    minWidth={column.width || 150}
                  >
                    <Text fontSize="$3" color="$gray11">
                      {column.render ? column.render(row[column.field], row) : row[column.field]}
                    </Text>
                  </XStack>
                ))}
              </XStack>
            ))
          )}
        </YStack>
      </ScrollView>

      {/* Pagination */}
      {paginator && totalPages > 1 && (
        <XStack ai="center" jc="space-between" p="$3" bg="$gray1" btw={1} bc="$borderColor">
          <Text fontSize="$3" color="$gray10">
            Showing {((currentPage - 1) * rows) + 1} to {Math.min(currentPage * rows, processedData.length)} of {processedData.length} entries
          </Text>
          <XStack ai="center" gap="$2">
            <Button
              size="$3"
              disabled={currentPage === 1}
              onPress={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            >
              Previous
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <Button
                key={page}
                size="$3"
                variant={page === currentPage ? 'default' : 'outlined'}
                onPress={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            ))}
            <Button
              size="$3"
              disabled={currentPage === totalPages}
              onPress={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            >
              Next
            </Button>
          </XStack>
        </XStack>
      )}
    </YStack>
  )
}

// =============================================================================
// DIALOG COMPONENT (Like PrimeReact Dialog)
// =============================================================================

interface DialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: string
  children: React.ReactNode
  footer?: React.ReactNode
  width?: number
  height?: number
  closable?: boolean
  modal?: boolean
  position?: 'center' | 'top' | 'bottom'
}

const CustomDialog: React.FC<DialogProps> = ({
  open,
  onOpenChange,
  title,
  children,
  footer,
  width = 400,
  height,
  closable = true,
  modal = true,
  position = 'center'
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal={modal}>
      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          animation="quick"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <Dialog.Content
          bordered
          elevate
          key="content"
          animateOnly={['transform', 'opacity']}
          animation={[
            'quick',
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          gap="$4"
          w={width}
          h={height}
          maw="90%"
          mah="90%"
          {...(position === 'top' && { y: -200 })}
          {...(position === 'bottom' && { y: 200 })}
        >
          {/* Header */}
          {(title || closable) && (
            <XStack ai="center" jc="space-between" p="$4" bbw={1} bc="$borderColor">
              {title && (
                <Dialog.Title fontSize="$6" fontWeight="600">
                  {title}
                </Dialog.Title>
              )}
              {closable && (
                <Dialog.Close asChild>
                  <Button size="$3" circular icon={X} />
                </Dialog.Close>
              )}
            </XStack>
          )}

          {/* Content */}
          <YStack f={1} p="$4" overflow="hidden">
            {children}
          </YStack>

          {/* Footer */}
          {footer && (
            <XStack ai="center" jc="flex-end" gap="$3" p="$4" btw={1} bc="$borderColor">
              {footer}
            </XStack>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  )
}

// =============================================================================
// CALENDAR COMPONENT (Like PrimeReact Calendar)
// =============================================================================

interface CalendarProps {
  value?: Date
  onChange?: (date: Date) => void
  inline?: boolean
  showIcon?: boolean
  placeholder?: string
  disabled?: boolean
  minDate?: Date
  maxDate?: Date
}

const Calendar: React.FC<CalendarProps> = ({
  value,
  onChange,
  inline = false,
  showIcon = true,
  placeholder = 'Select date',
  disabled = false,
  minDate,
  maxDate
}) => {
  const [open, setOpen] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(value || new Date())

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay()
  const today = new Date()

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const handleDateClick = (day: number) => {
    const selectedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    
    if (minDate && selectedDate < minDate) return
    if (maxDate && selectedDate > maxDate) return
    
    onChange?.(selectedDate)
    if (!inline) setOpen(false)
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev)
      newMonth.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1))
      return newMonth
    })
  }

  const CalendarContent = () => (
    <YStack bg="$background" br="$4" p="$3" w={300} elevation="$4">
      {/* Header */}
      <XStack ai="center" jc="space-between" mb="$3">
        <Button size="$3" circular icon={ChevronUp} onPress={() => navigateMonth('prev')} />
        <Text fontSize="$4" fontWeight="600">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </Text>
        <Button size="$3" circular icon={ChevronDown} onPress={() => navigateMonth('next')} />
      </XStack>

      {/* Day names */}
      <XStack mb="$2">
        {dayNames.map(day => (
          <XStack key={day} f={1} ai="center" jc="center" p="$2">
            <Text fontSize="$3" fontWeight="600" color="$gray10">{day}</Text>
          </XStack>
        ))}
      </XStack>

      {/* Calendar grid */}
      <YStack gap="$1">
        {Array.from({ length: 6 }, (_, week) => (
          <XStack key={week} gap="$1">
            {Array.from({ length: 7 }, (_, day) => {
              const dayNumber = week * 7 + day - firstDayOfMonth + 1
              const isValidDay = dayNumber > 0 && dayNumber <= daysInMonth
              const currentDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), dayNumber)
              const isToday = isValidDay && 
                currentDate.toDateString() === today.toDateString()
              const isSelected = value && isValidDay &&
                currentDate.toDateString() === value.toDateString()
              const isDisabled = !isValidDay || 
                (minDate && currentDate < minDate) ||
                (maxDate && currentDate > maxDate)

              return (
                <Button
                  key={day}
                  size="$3"
                  f={1}
                  aspectRatio={1}
                  variant={isSelected ? 'default' : isToday ? 'outlined' : 'ghost'}
                  disabled={isDisabled}
                  onPress={() => isValidDay && handleDateClick(dayNumber)}
                  bg={isSelected ? '$blue9' : isToday ? '$blue3' : 'transparent'}
                  color={isSelected ? 'white' : isToday ? '$blue11' : '$gray12'}
                >
                  {isValidDay ? dayNumber : ''}
                </Button>
              )
            })}
          </XStack>
        ))}
      </YStack>
    </YStack>
  )

  if (inline) {
    return <CalendarContent />
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <Button
          variant="outlined"
          disabled={disabled}
          iconAfter={showIcon ? <Calendar size={16} /> : undefined}
          jc="flex-start"
        >
          {value ? value.toLocaleDateString() : placeholder}
        </Button>
      </Popover.Trigger>
      <Popover.Content>
        <CalendarContent />
      </Popover.Content>
    </Popover>
  )
}

// =============================================================================
// FORM COMPONENTS (Like PrimeReact Form Components)
// =============================================================================

interface FormFieldProps {
  label?: string
  error?: string
  required?: boolean
  children: React.ReactNode
  helpText?: string
}

const FormField: React.FC<FormFieldProps> = ({ label, error, required, children, helpText }) => (
  <YStack gap="$2" mb="$3">
    {label && (
      <XStack ai="center" gap="$2">
        <Text fontSize="$4" fontWeight="500" color="$gray12">
          {label}
        </Text>
        {required && <Text color="$red10">*</Text>}
      </XStack>
    )}
    {children}
    {error && (
      <XStack ai="center" gap="$2">
        <AlertCircle size={16} color="$red10" />
        <Text fontSize="$3" color="$red10">{error}</Text>
      </XStack>
    )}
    {helpText && !error && (
      <Text fontSize="$3" color="$gray10">{helpText}</Text>
    )}
  </YStack>
)

// Multi-Select Component
interface MultiSelectProps {
  options: Array<{ label: string; value: string }>
  value: string[]
  onChange: (value: string[]) => void
  placeholder?: string
  disabled?: boolean
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select options',
  disabled = false
}) => {
  const [open, setOpen] = useState(false)

  const toggleOption = (optionValue: string) => {
    const newValue = value.includes(optionValue)
      ? value.filter(v => v !== optionValue)
      : [...value, optionValue]
    onChange(newValue)
  }

  const selectedLabels = options
    .filter(option => value.includes(option.value))
    .map(option => option.label)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <Button
          variant="outlined"
          disabled={disabled}
          iconAfter={<ChevronDown size={16} />}
          jc="flex-start"
        >
          {selectedLabels.length > 0 ? selectedLabels.join(', ') : placeholder}
        </Button>
      </Popover.Trigger>
      <Popover.Content>
        <YStack bg="$background" br="$4" p="$2" w={250} maxHeight={200}>
          <ScrollView>
            {options.map(option => (
              <XStack
                key={option.value}
                ai="center"
                gap="$3"
                p="$3"
                pressStyle={{ bg: '$gray3' }}
                onPress={() => toggleOption(option.value)}
              >
                <Checkbox
                  checked={value.includes(option.value)}
                  onCheckedChange={() => toggleOption(option.value)}
                />
                <Text f={1}>{option.label}</Text>
              </XStack>
            ))}
          </ScrollView>
        </YStack>
      </Popover.Content>
    </Popover>
  )
}

// =============================================================================
// TOAST/NOTIFICATION COMPONENT
// =============================================================================

interface ToastProps {
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message?: string
  duration?: number
  onClose?: () => void
}

const Toast: React.FC<ToastProps> = ({ type, title, message, duration = 5000, onClose }) => {
  const [visible, setVisible] = useState(true)

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      onClose?.()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  if (!visible) return null

  const getIcon = () => {
    switch (type) {
      case 'success': return <Check size={20} color="$green10" />
      case 'error': return <X size={20} color="$red10" />
      case 'warning': return <AlertCircle size={20} color="$yellow10" />
      case 'info': return <Info size={20} color="$blue10" />
    }
  }

  const getBgColor = () => {
    switch (type) {
      case 'success': return '$green2'
      case 'error': return '$red2'
      case 'warning': return '$yellow2'
      case 'info': return '$blue2'
    }
  }

  return (
    <Card
      bg={getBgColor()}
      p="$4"
      br="$4"
      bw={1}
      bc={`$${type}6`}
      elevation="$6"
      animation="bouncy"
      enterStyle={{ x: 100, opacity: 0 }}
      exitStyle={{ x: 100, opacity: 0 }}
    >
      <XStack ai="center" gap="$3">
        {getIcon()}
        <YStack f={1}>
          <Text fontSize="$4" fontWeight="600">{title}</Text>
          {message && <Text fontSize="$3" color="$gray11">{message}</Text>}
        </YStack>
        <Button
          size="$2"
          circular
          variant="ghost"
          icon={<X size={16} />}
          onPress={() => {
            setVisible(false)
            onClose?.()
          }}
        />
      </XStack>
    </Card>
  )
}

// =============================================================================
// EXAMPLE USAGE
// =============================================================================

const ExampleUsage: React.FC = () => {
  const [selectedUsers, setSelectedUsers] = useState<any[]>([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [multiSelectValue, setMultiSelectValue] = useState<string[]>([])

  const sampleData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Inactive' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Active' },
  ]

  const columns: Column[] = [
    { field: 'name', header: 'Name', sortable: true },
    { field: 'email', header: 'Email', sortable: true },
    { field: 'role', header: 'Role', sortable: true },
    { 
      field: 'status', 
      header: 'Status', 
      sortable: true,
      render: (value) => (
        <Badge variant={value === 'Active' ? 'green' : 'red'}>
          {value}
        </Badge>
      )
    },
    {
      field: 'actions',
      header: 'Actions',
      render: (_, row) => (
        <XStack gap="$2">
          <Button size="$2" icon={<Eye size={16} />} variant="ghost" />
          <Button size="$2" icon={<Edit size={16} />} variant="ghost" />
          <Button size="$2" icon={<Trash2 size={16} />} variant="ghost" />
        </XStack>
      )
    }
  ]

  const multiSelectOptions = [
    { label: 'React', value: 'react' },
    { label: 'Vue', value: 'vue' },
    { label: 'Angular', value: 'angular' },
    { label: 'Svelte', value: 'svelte' }
  ]

  return (
    <ScrollView f={1} p="$4">
      <YStack gap="$6">
        <H3>Tamagui PrimeReact-like Components</H3>

        {/* Data Table */}
        <YStack>
          <H4>Data Table</H4>
          <DataTable
            data={sampleData}
            columns={columns}
            paginator
            rows={5}
            selection={selectedUsers}
            onSelectionChange={setSelectedUsers}
            globalFilter=""
          />
        </YStack>

        {/* Dialog */}
        <YStack>
          <H4>Dialog</H4>
          <Button onPress={() => setDialogOpen(true)}>Open Dialog</Button>
          <CustomDialog
            open={dialogOpen}
            onOpenChange={setDialogOpen}
            title="User Details"
            footer={
              <>
                <Button variant="outlined" onPress={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onPress={() => setDialogOpen(false)}>
                  Save
                </Button>
              </>
            }
          >
            <YStack gap="$4">
              <FormField label="Full Name" required>
                <Input placeholder="Enter full name" />
              </FormField>
              <FormField label="Email" required>
                <Input placeholder="Enter email" />
              </FormField>
              <FormField label="Role">
                <Select defaultValue="user">
                  <Select.Trigger>
                    <Select.Value placeholder="Select role" />
                  </Select.Trigger>
                  <Select.Content>
                    <Select.Item value="admin">Admin</Select.Item>
                    <Select.Item value="user">User</Select.Item>
                    <Select.Item value="guest">Guest</Select.Item>
                  </Select.Content>
                </Select>
              </FormField>
            </YStack>
          </CustomDialog>
        </YStack>

        {/* Calendar */}
        <YStack>
          <H4>Calendar</H4>
          <XStack gap="$4" ai="flex-start">
            <Calendar
              value={selectedDate}
              onChange={setSelectedDate}
              showIcon
              placeholder="Select date"
            />
            <Calendar
              value={selectedDate}
              onChange={setSelectedDate}
              inline
            />
          </XStack>
        </YStack>

        {/* Form Components */}
        <YStack>
          <H4>Form Components</H4>
          <YStack gap="$4">
            <FormField label="Multi Select" helpText="Select multiple frameworks">
              <MultiSelect
                options={multiSelectOptions}
                value={multiSelectValue}
                onChange={setMultiSelectValue}
                placeholder="Select frameworks"
              />
            </FormField>
            
            <FormField label="Checkbox Group">
              <YStack gap="$2">
                <XStack ai="center" gap="$2">
                  <Checkbox id="option1" />
                  <Text>Option 1</Text>
                </XStack>
                <XStack ai="center" gap="$2">
                  <Checkbox id="option2" />
                  <Text>Option 2</Text>
                </XStack>
              </YStack>
            </FormField>
          </YStack>
        </YStack>

        {/* Toast Examples */}
        <YStack>
          <H4>Toast Notifications</H4>
          <XStack gap="$2" flexWrap="wrap">
            <Toast type="success" title="Success!" message="Operation completed successfully" />
            <Toast type="error" title="Error!" message="Something went wrong" />
            <Toast type="warning" title="Warning!" message="Please check your input" />
            <Toast type="info" title="Info" message="New update available" />
          </XStack>
        </YStack>
      </YStack>
    </ScrollView>
  )
}

export default ExampleUsage
export { DataTable, CustomDialog as Dialog, Calendar, FormField, MultiSelect, Toast }