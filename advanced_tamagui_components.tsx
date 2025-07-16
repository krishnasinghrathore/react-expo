import React, { useState, useMemo, useCallback } from 'react'
import {
  YStack,
  XStack,
  Text,
  Button,
  Input,
  ScrollView,
  Dialog,
  Select,
  Checkbox,
  Card,
  Badge,
  Progress,
  Separator,
  Circle,
  Square,
  H3,
  H4,
  H5,
  Paragraph,
  useTheme,
  AnimatePresence,
  styled,
  Stack,
  Spinner,
  Sheet,
  Slider,
  Switch,
  Popover,
  RadioGroup,
  Adapt,
  AlertDialog,
  Image,
  Avatar,
  LinearGradient,
  Tabs,
  Group,
  ListItem,
  Theme,
  SizableText,
  View
} from 'tamagui'
import { 
  ChevronDown, 
  ChevronRight, 
  ChevronUp, 
  Search, 
  Filter, 
  Download, 
  Upload, 
  Edit, 
  Trash2, 
  Eye, 
  Plus, 
  Minus,
  BarChart3,
  PieChart,
  TrendingUp,
  TrendingDown,
  MoreHorizontal,
  Settings,
  Expand,
  Shrink,
  Move,
  ArrowUpDown,
  SortAsc,
  SortDesc,
  Calendar,
  DollarSign,
  Users,
  Package,
  Activity,
  X,
  Check,
  AlertCircle,
  Info,
  RefreshCw,
  ExternalLink,
  Copy,
  Share2,
  Archive,
  Star,
  FileText,
  Zap,
  Target,
  Layers,
  Grid,
  List,
  RotateCcw,
  Save,
  Send,
  MessageSquare,
  Bell,
  Home,
  Briefcase,
  Mail,
  Phone,
  MapPin,
  Globe,
  Github,
  Twitter,
  Linkedin,
  Instagram,
  Facebook,
  Youtube,
  Twitch,
  Slack,
  Discord,
  Figma,
  Dribbble,
  Behance,
  Medium,
  Reddit,
  Whatsapp,
  Telegram
} from '@tamagui/lucide-icons'

// =============================================================================
// NESTED DATA TABLE WITH EXPANDABLE ROWS
// =============================================================================

interface NestedColumn {
  field: string
  header: string
  sortable?: boolean
  width?: number
  expandable?: boolean
  render?: (value: any, row: any, expanded?: boolean) => React.ReactNode
}

interface NestedDataTableProps {
  data: any[]
  columns: NestedColumn[]
  childrenField?: string
  expandedRowRender?: (row: any) => React.ReactNode
  paginator?: boolean
  rows?: number
  selection?: any[]
  onSelectionChange?: (selection: any[]) => void
  loading?: boolean
  emptyMessage?: string
  rowExpansion?: boolean
  defaultExpandedRows?: any[]
  onRowExpand?: (row: any) => void
  onRowCollapse?: (row: any) => void
  globalFilter?: string
  treeMode?: boolean
  groupBy?: string
  virtualScroll?: boolean
  exportable?: boolean
  resizableColumns?: boolean
  reorderableColumns?: boolean
  editMode?: 'cell' | 'row'
  onCellEdit?: (rowData: any, field: string, value: any) => void
  onRowEdit?: (rowData: any) => void
  scrollHeight?: number
  frozen?: boolean
  responsiveLayout?: 'stack' | 'scroll'
  showGridlines?: boolean
  stripedRows?: boolean
  size?: 'small' | 'normal' | 'large'
  density?: 'comfortable' | 'compact' | 'spacious'
}

const NestedDataTable: React.FC<NestedDataTableProps> = ({
  data,
  columns,
  childrenField = 'children',
  expandedRowRender,
  paginator = false,
  rows = 10,
  selection = [],
  onSelectionChange,
  loading = false,
  emptyMessage = 'No data available',
  rowExpansion = false,
  defaultExpandedRows = [],
  onRowExpand,
  onRowCollapse,
  globalFilter = '',
  treeMode = false,
  groupBy,
  virtualScroll = false,
  exportable = false,
  resizableColumns = false,
  reorderableColumns = false,
  editMode,
  onCellEdit,
  onRowEdit,
  scrollHeight = 400,
  frozen = false,
  responsiveLayout = 'scroll',
  showGridlines = true,
  stripedRows = true,
  size = 'normal',
  density = 'comfortable'
}) => {
  const [expandedRows, setExpandedRows] = useState<Set<any>>(new Set(defaultExpandedRows))
  const [currentPage, setCurrentPage] = useState(1)
  const [sortConfig, setSortConfig] = useState<{field: string, order: 'asc' | 'desc'} | null>(null)
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>({})
  const [columnOrder, setColumnOrder] = useState<string[]>(columns.map(col => col.field))
  const [editingCell, setEditingCell] = useState<{row: any, field: string} | null>(null)
  const [editingRow, setEditingRow] = useState<any>(null)
  const [editValue, setEditValue] = useState<any>('')
  const [filters, setFilters] = useState<Record<string, any>>({})
  const [columnFilters, setColumnFilters] = useState<Record<string, string>>({})
  const [selectedColumns, setSelectedColumns] = useState<string[]>(columns.map(col => col.field))
  const [groupedData, setGroupedData] = useState<any[]>([])
  const theme = useTheme()

  // Get padding based on density
  const getPadding = () => {
    switch (density) {
      case 'compact': return '$2'
      case 'spacious': return '$4'
      default: return '$3'
    }
  }

  // Get font size based on size
  const getFontSize = () => {
    switch (size) {
      case 'small': return '$3'
      case 'large': return '$5'
      default: return '$4'
    }
  }

  // Process data with filters, sorting, and grouping
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

    // Column filters
    Object.entries(columnFilters).forEach(([field, filterValue]) => {
      if (filterValue) {
        filtered = filtered.filter(row =>
          String(row[field]).toLowerCase().includes(filterValue.toLowerCase())
        )
      }
    })

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

    // Group by
    if (groupBy) {
      const grouped = filtered.reduce((acc, row) => {
        const key = row[groupBy]
        if (!acc[key]) acc[key] = []
        acc[key].push(row)
        return acc
      }, {} as Record<string, any[]>)
      
      return Object.entries(grouped).map(([key, items]) => ({
        isGroup: true,
        groupKey: key,
        groupItems: items,
        id: `group_${key}`
      }))
    }

    return filtered
  }, [data, globalFilter, columnFilters, sortConfig, groupBy, columns])

  // Pagination
  const totalPages = Math.ceil(processedData.length / rows)
  const paginatedData = paginator 
    ? processedData.slice((currentPage - 1) * rows, currentPage * rows)
    : processedData

  // Handle row expansion
  const toggleRowExpansion = (row: any) => {
    const newExpanded = new Set(expandedRows)
    if (newExpanded.has(row.id)) {
      newExpanded.delete(row.id)
      onRowCollapse?.(row)
    } else {
      newExpanded.add(row.id)
      onRowExpand?.(row)
    }
    setExpandedRows(newExpanded)
  }

  // Handle sorting
  const handleSort = (field: string) => {
    setSortConfig(prev => ({
      field,
      order: prev?.field === field && prev.order === 'asc' ? 'desc' : 'asc'
    }))
  }

  // Handle cell editing
  const handleCellEdit = (row: any, field: string, currentValue: any) => {
    if (editMode === 'cell') {
      setEditingCell({ row, field })
      setEditValue(currentValue)
    }
  }

  const saveCellEdit = () => {
    if (editingCell) {
      onCellEdit?.(editingCell.row, editingCell.field, editValue)
      setEditingCell(null)
      setEditValue('')
    }
  }

  const cancelCellEdit = () => {
    setEditingCell(null)
    setEditValue('')
  }

  // Handle row editing
  const handleRowEdit = (row: any) => {
    if (editMode === 'row') {
      setEditingRow(row)
    }
  }

  const saveRowEdit = () => {
    if (editingRow) {
      onRowEdit?.(editingRow)
      setEditingRow(null)
    }
  }

  const cancelRowEdit = () => {
    setEditingRow(null)
  }

  // Export functionality
  const exportData = () => {
    const csv = [
      columns.map(col => col.header).join(','),
      ...processedData.map(row => 
        columns.map(col => row[col.field]).join(',')
      )
    ].join('\n')
    
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'data.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  // Render nested rows
  const renderNestedRows = (parentRow: any, level: number = 0) => {
    const children = parentRow[childrenField]
    if (!children || !Array.isArray(children)) return null

    return children.map((child: any, index: number) => (
      <React.Fragment key={`${parentRow.id}_child_${index}`}>
        <XStack
          bbw={showGridlines ? 1 : 0}
          bc="$borderColor"
          bg={stripedRows && index % 2 === 1 ? '$gray1' : '$background'}
          hoverStyle={{ bg: '$gray2' }}
          pl={`$${(level + 1) * 4}`}
        >
          {onSelectionChange && (
            <XStack w={50} ai="center" jc="center" p={getPadding()}>
              <Checkbox 
                checked={selection.some(item => item.id === child.id)}
                onCheckedChange={() => {
                  const isSelected = selection.some(item => item.id === child.id)
                  if (isSelected) {
                    onSelectionChange(selection.filter(item => item.id !== child.id))
                  } else {
                    onSelectionChange([...selection, child])
                  }
                }}
              />
            </XStack>
          )}
          {columns.map((column, colIndex) => (
            <XStack
              key={`${child.id}_${column.field}`}
              f={1}
              ai="center"
              p={getPadding()}
              brw={showGridlines && colIndex < columns.length - 1 ? 1 : 0}
              bc="$borderColor"
              minWidth={columnWidths[column.field] || column.width || 150}
            >
              {column.expandable && child[childrenField] && (
                <Button
                  size="$2"
                  mr="$2"
                  circular
                  icon={expandedRows.has(child.id) ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  onPress={() => toggleRowExpansion(child)}
                  variant="ghost"
                />
              )}
              <Text fontSize={getFontSize()} color="$gray11">
                {column.render ? column.render(child[column.field], child, expandedRows.has(child.id)) : child[column.field]}
              </Text>
            </XStack>
          ))}
        </XStack>
        {expandedRows.has(child.id) && renderNestedRows(child, level + 1)}
      </React.Fragment>
    ))
  }

  // Render group rows
  const renderGroupRow = (group: any) => (
    <XStack
      key={group.id}
      bg="$gray3"
      p={getPadding()}
      bbw={1}
      bc="$borderColor"
      ai="center"
      jc="space-between"
    >
      <XStack ai="center" gap="$2">
        <Button
          size="$2"
          circular
          icon={expandedRows.has(group.id) ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          onPress={() => toggleRowExpansion(group)}
          variant="ghost"
        />
        <Text fontSize={getFontSize()} fontWeight="600">
          {group.groupKey} ({group.groupItems.length} items)
        </Text>
      </XStack>
      <Badge>{group.groupItems.length}</Badge>
    </XStack>
  )

  // Render action buttons
  const renderActionButtons = () => (
    <XStack ai="center" gap="$2" p="$3">
      {exportable && (
        <Button size="$3" icon={<Download size={16} />} onPress={exportData}>
          Export
        </Button>
      )}
      <Button size="$3" icon={<RefreshCw size={16} />} onPress={() => window.location.reload()}>
        Refresh
      </Button>
      <Popover>
        <Popover.Trigger asChild>
          <Button size="$3" icon={<Settings size={16} />}>
            Columns
          </Button>
        </Popover.Trigger>
        <Popover.Content>
          <YStack p="$3" gap="$2" w={200}>
            <Text fontSize="$4" fontWeight="600">Show/Hide Columns</Text>
            <Separator />
            {columns.map(col => (
              <XStack key={col.field} ai="center" jc="space-between">
                <Text fontSize="$3">{col.header}</Text>
                <Switch
                  checked={selectedColumns.includes(col.field)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedColumns([...selectedColumns, col.field])
                    } else {
                      setSelectedColumns(selectedColumns.filter(field => field !== col.field))
                    }
                  }}
                />
              </XStack>
            ))}
          </YStack>
        </Popover.Content>
      </Popover>
    </XStack>
  )

  if (loading) {
    return (
      <YStack f={1} ai="center" jc="center" p="$8">
        <Spinner size="large" />
        <Text mt="$4" color="$gray10">Loading data...</Text>
      </YStack>
    )
  }

  return (
    <YStack f={1} bg="$background" br="$4" overflow="hidden">
      {/* Action Bar */}
      {renderActionButtons()}

      {/* Global Filter */}
      <XStack p="$3" ai="center" gap="$3" bbw={1} bc="$borderColor">
        <Input
          f={1}
          placeholder="Search all columns..."
          value={globalFilter}
          onChangeText={setGlobalFilter}
          icon={<Search size={16} />}
        />
        <Button size="$3" icon={<Filter size={16} />}>
          Advanced Filter
        </Button>
      </XStack>

      {/* Table */}
      <ScrollView 
        horizontal={responsiveLayout === 'scroll'} 
        showsHorizontalScrollIndicator={false}
        maxHeight={scrollHeight}
      >
        <YStack f={1} minWidth="100%">
          {/* Column Headers */}
          <XStack bg="$gray3" bw={1} bc="$borderColor" btw={0}>
            {onSelectionChange && (
              <XStack w={50} ai="center" jc="center" p={getPadding()}>
                <Checkbox 
                  checked={selection.length === processedData.length && processedData.length > 0}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      onSelectionChange(processedData.filter(row => !row.isGroup))
                    } else {
                      onSelectionChange([])
                    }
                  }}
                />
              </XStack>
            )}
            {columns.filter(col => selectedColumns.includes(col.field)).map((column, index) => (
              <XStack
                key={column.field}
                f={1}
                ai="center"
                jc="space-between"
                p={getPadding()}
                bbw={1}
                bc="$borderColor"
                brw={showGridlines && index < columns.length - 1 ? 1 : 0}
                pressStyle={{ bg: '$gray4' }}
                onPress={() => column.sortable && handleSort(column.field)}
                cursor={column.sortable ? 'pointer' : 'default'}
                minWidth={columnWidths[column.field] || column.width || 150}
              >
                <Text fontSize={getFontSize()} fontWeight="600" color="$gray12">
                  {column.header}
                </Text>
                <XStack ai="center" gap="$2">
                  {column.sortable && (
                    <YStack>
                      {sortConfig?.field === column.field ? (
                        sortConfig.order === 'asc' ? <SortAsc size={16} /> : <SortDesc size={16} />
                      ) : (
                        <ArrowUpDown size={16} opacity={0.5} />
                      )}
                    </YStack>
                  )}
                  {resizableColumns && (
                    <Button
                      size="$1"
                      icon={<Move size={12} />}
                      variant="ghost"
                      cursor="col-resize"
                    />
                  )}
                </XStack>
              </XStack>
            ))}
          </XStack>

          {/* Column Filters */}
          <XStack bg="$gray2" bw={1} bc="$borderColor" btw={0}>
            {onSelectionChange && <XStack w={50} />}
            {columns.filter(col => selectedColumns.includes(col.field)).map((column, index) => (
              <XStack
                key={`filter_${column.field}`}
                f={1}
                p="$2"
                brw={showGridlines && index < columns.length - 1 ? 1 : 0}
                bc="$borderColor"
                minWidth={columnWidths[column.field] || column.width || 150}
              >
                <Input
                  size="$2"
                  placeholder={`Filter ${column.header}`}
                  value={columnFilters[column.field] || ''}
                  onChangeText={(value) => setColumnFilters(prev => ({
                    ...prev,
                    [column.field]: value
                  }))}
                />
              </XStack>
            ))}
          </XStack>

          {/* Data Rows */}
          {paginatedData.length === 0 ? (
            <YStack f={1} ai="center" jc="center" p="$8">
              <Text color="$gray10" fontSize={getFontSize()}>{emptyMessage}</Text>
            </YStack>
          ) : (
            paginatedData.map((row, rowIndex) => (
              <React.Fragment key={row.id || rowIndex}>
                {row.isGroup ? (
                  renderGroupRow(row)
                ) : (
                  <XStack
                    bbw={showGridlines ? 1 : 0}
                    bc="$borderColor"
                    bg={stripedRows && rowIndex % 2 === 1 ? '$gray1' : '$background'}
                    hoverStyle={{ bg: '$gray2' }}
                    pressStyle={{ bg: '$gray3' }}
                    onPress={() => handleRowEdit(row)}
                  >
                    {onSelectionChange && (
                      <XStack w={50} ai="center" jc="center" p={getPadding()}>
                        <Checkbox 
                          checked={selection.some(item => item.id === row.id)}
                          onCheckedChange={() => {
                            const isSelected = selection.some(item => item.id === row.id)
                            if (isSelected) {
                              onSelectionChange(selection.filter(item => item.id !== row.id))
                            } else {
                              onSelectionChange([...selection, row])
                            }
                          }}
                        />
                      </XStack>
                    )}
                    {columns.filter(col => selectedColumns.includes(col.field)).map((column, colIndex) => (
                      <XStack
                        key={`${row.id}_${column.field}`}
                        f={1}
                        ai="center"
                        p={getPadding()}
                        brw={showGridlines && colIndex < columns.length - 1 ? 1 : 0}
                        bc="$borderColor"
                        minWidth={columnWidths[column.field] || column.width || 150}
                        onPress={() => handleCellEdit(row, column.field, row[column.field])}
                      >
                        {column.expandable && (row[childrenField] || rowExpansion) && (
                          <Button
                            size="$2"
                            mr="$2"
                            circular
                            icon={expandedRows.has(row.id) ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                            onPress={() => toggleRowExpansion(row)}
                            variant="ghost"
                          />
                        )}
                        {editingCell?.row.id === row.id && editingCell?.field === column.field ? (
                          <XStack ai="center" gap="$2" f={1}>
                            <Input
                              f={1}
                              value={editValue}
                              onChangeText={setEditValue}
                              size="$2"
                              autoFocus
                            />
                            <Button size="$2" icon={<Check size={12} />} onPress={saveCellEdit} />
                            <Button size="$2" icon={<X size={12} />} onPress={cancelCellEdit} />
                          </XStack>
                        ) : (
                          <Text fontSize={getFontSize()} color="$gray11">
                            {column.render ? column.render(row[column.field], row, expandedRows.has(row.id)) : row[column.field]}
                          </Text>
                        )}
                      </XStack>
                    ))}
                  </XStack>
                )}
                
                {/* Expanded Row Content */}
                {expandedRows.has(row.id) && !row.isGroup && (
                  <XStack bbw={1} bc="$borderColor" bg="$gray1">
                    <YStack f={1} p="$4">
                      {expandedRowRender ? (
                        expandedRowRender(row)
                      ) : (
                        renderNestedRows(row)
                      )}
                    </YStack>
                  </XStack>
                )}

                {/* Group Items */}
                {row.isGroup && expandedRows.has(row.id) && (
                  row.groupItems.map((item: any, itemIndex: number) => (
                    <XStack
                      key={`group_item_${item.id}`}
                      bbw={showGridlines ? 1 : 0}
                      bc="$borderColor"
                      bg={stripedRows && itemIndex % 2 === 1 ? '$gray1' : '$background'}
                      hoverStyle={{ bg: '$gray2' }}
                      pl="$6"
                    >
                      {onSelectionChange && (
                        <XStack w={50} ai="center" jc="center" p={getPadding()}>
                          <Checkbox 
                            checked={selection.some(selItem => selItem.id === item.id)}
                            onCheckedChange={() => {
                              const isSelected = selection.some(selItem => selItem.id === item.id)
                              if (isSelected) {
                                onSelectionChange(selection.filter(selItem => selItem.id !== item.id))
                              } else {
                                onSelectionChange([...selection, item])
                              }
                            }}
                          />
                        </XStack>
                      )}
                      {columns.filter(col => selectedColumns.includes(col.field)).map((column, colIndex) => (
                        <XStack
                          key={`group_${item.id}_${column.field}`}
                          f={1}
                          ai="center"
                          p={getPadding()}
                          brw={showGridlines && colIndex < columns.length - 1 ? 1 : 0}
                          bc="$borderColor"
                          minWidth={columnWidths[column.field] || column.width || 150}
                        >
                          <Text fontSize={getFontSize()} color="$gray11">
                            {column.render ? column.render(item[column.field], item) : item[column.field]}
                          </Text>
                        </XStack>
                      ))}
                    </XStack>
                  ))
                )}
              </React.Fragment>
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
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              const page = i + Math.max(1, currentPage - 2)
              return (
                <Button
                  key={page}
                  size="$3"
                  variant={page === currentPage ? 'default' : 'outlined'}
                  onPress={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              )
            })}
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
// CHART COMPONENTS USING TAMAGUI PRIMITIVES
// =============================================================================

interface ChartDataPoint {
  label: string
  value: number
  color?: string
}

interface BarChartProps {
  data: ChartDataPoint[]
  width?: number
  height?: number
  title?: string
  showValues?: boolean
  showGrid?: boolean
  animated?: boolean
  horizontal?: boolean
}

const BarChart: React.FC<BarChartProps> = ({
  data,
  width = 400,
  height = 300,
  title,
  showValues = true,
  showGrid = true,
  animated = true,
  horizontal = false
}) => {
  const theme = useTheme()
  const maxValue = Math.max(...data.map(d => d.value))
  const chartHeight = height - 60 // Reserve space for labels
  const chartWidth = width - 80 // Reserve space for values

  const getBarColor = (index: number) => {
    const colors = ['$blue9', '$green9', '$red9', '$yellow9', '$purple9', '$orange9']
    return colors[index % colors.length]
  }

  return (
    <YStack bg="$background" br="$4" p="$4" w={width} h={height}>
      {title && (
        <Text fontSize="$6" fontWeight="600" ta="center" mb="$3">
          {title}
        </Text>
      )}
      
      <YStack f={1} pos="relative">
        {/* Chart Area */}
        <XStack f={1} ai="flex-end" jc="space-around" gap="$2">
          {data.map((item, index) => {
            const barHeight = (item.value / maxValue) * chartHeight
            const barWidth = (chartWidth / data.length) * 0.8
            
            return (
              <YStack key={item.label} ai="center" gap="$2">
                {/* Bar */}
                <YStack
                  bg={item.color || getBarColor(index)}
                  br="$2"
                  w={horizontal ? barHeight : barWidth}
                  h={horizontal ? barWidth : barHeight}
                  ai="center"
                  jc="center"
                  animation={animated ? 'bouncy' : undefined}
                  enterStyle={animated ? { scale: 0 } : undefined}
                  hoverStyle={{ scale: 1.05 }}
                  pressStyle={{ scale: 0.95 }}
                >
                  {showValues && (
                    <Text 
                      fontSize="$3" 
                      color="white" 
                      fontWeight="600"
                      rotation={horizontal ? 90 : 0}
                    >
                      {item.value}
                    </Text>
                  )}
                </YStack>
                
                {/* Label */}
                <Text fontSize="$3" color="$gray11" ta="center" maw={barWidth}>
                  {item.label}
                </Text>
              </YStack>
            )
          })}
        </XStack>
        
        {/* Grid Lines */}
        {showGrid && (
          <YStack pos="absolute" t={0} l={0} r={0} b={0} zIndex={-1}>
            {Array.from({ length: 5 }, (_, i) => (
              <XStack
                key={i}
                pos="absolute"
                t={`${(i / 4) * 100}%`}
                l={0}
                r={0}
                h={1}
                bg="$gray5"
                opacity={0.3}
              />
            ))}
          </YStack>
        )}
      </YStack>
    </YStack>
  )
}

interface LineChartProps {
  data: ChartDataPoint[]
  width?: number
  height?: number
  title?: string
  showPoints?: boolean
  showGrid?: boolean
  animated?: boolean
  smooth?: boolean
  color?: string
}

const LineChart: React.FC<LineChartProps> = ({
  data,
  width = 400,
  height = 300,
  title,
  showPoints = true,
  showGrid = true,
  animated = true,
  smooth = true,
  color = '$blue9'
}) => {
  const theme = useTheme()
  const maxValue = Math.max(...data.map(d => d.value))
  const minValue = Math.min(...data.map(d => d.value))
  const chartHeight = height - 60
  const chartWidth = width - 80

  const getPointPosition = (index: number, value: number) => {
    const x = (index / (data.length - 1)) * chartWidth
    const y = chartHeight - ((value - minValue) / (maxValue - minValue)) * chartHeight
    return { x, y }
  }

  return (
    <YStack bg="$background" br="$4" p="$4" w={width} h={height}>
      {title && (
        <Text fontSize="$6" fontWeight="600" ta="center" mb="$3">
          {title}
        </Text>
      )}
      
      <YStack f={1} pos="relative">
        {/* Chart Area */}
        <YStack f={1} pos="relative" bg="$gray1" br="$2" overflow="hidden">
          {/* Grid */}
          {showGrid && (
            <YStack pos="absolute" t={0} l={0} r={0} b={0}>
              {Array.from({ length: 5 }, (_, i) => (
                <XStack
                  key={`h-${i}`}
                  pos="absolute"
                  t={`${(i / 4) * 100}%`}
                  l={0}
                  r={0}
                  h={1}
                  bg="$gray5"
                  opacity={0.3}
                />
              ))}
              {Array.from({ length: 5 }, (_, i) => (
                <YStack
                  key={`v-${i}`}
                  pos="absolute"
                  l={`${(i / 4) * 100}%`}
                  t={0}
                  b={0}
                  w={1}
                  bg="$gray5"
                  opacity={0.3}
                />
              ))}
            </YStack>
          )}
          
          {/* Line and Points */}
          <YStack pos="absolute" t={0} l={0} r={0} b={0} p="$4">
            {data.map((item, index) => {
              const { x, y } = getPointPosition(index, item.value)
              const nextPoint = index < data.length - 1 ? getPointPosition(index + 1, data[index + 1].value) : null
              
              return (
                <React.Fragment key={index}>
                  {/* Line to next point */}
                  {nextPoint && (
                    <YStack
                      pos="absolute"
                      l={x}
                      t={y}
                      w={Math.sqrt(Math.pow(nextPoint.x - x, 2) + Math.pow(nextPoint.y - y, 2))}
                      h={2}
                      bg={color}
                      style={{
                        transformOrigin: '0 0',
                        transform: `rotate(${Math.atan2(nextPoint.y - y, nextPoint.x - x)}rad)`
                      }}
                      animation={animated ? 'bouncy' : undefined}
                      enterStyle={animated ? { scale: 0 } : undefined}
                    />
                  )}
                  
                  {/* Point */}
                  {showPoints && (
                    <Circle
                      pos="absolute"
                      l={x - 4}
                      t={y - 4}
                      size={8}
                      bg={color}
                      animation={animated ? 'bouncy' : undefined}
                      enterStyle={animated ? { scale: 0 } : undefined}
                      hoverStyle={{ scale: 1.5 }}
                      pressStyle={{ scale: 0.8 }}
                    />
                  )}
                </React.Fragment>
              )
            })}
          </YStack>
        </YStack>
        
        {/* X-axis labels */}
        <XStack jc="space-between" mt="$3" px="$4">
          {data.map((item, index) => (
            <Text key={index} fontSize="$3" color="$gray11">
              {item.label}
            </Text>
          ))}
        </XStack>
      </YStack>
    </YStack>
  )
}

interface PieChartProps {
  data: ChartDataPoint[]
  width?: number
  height?: number
  title?: string
  showLabels?: boolean
  showValues?: boolean
  animated?: boolean
  innerRadius?: number
}

const PieChart: React.FC<PieChartProps> = ({
  data,
  width = 300,
  height = 300,
  title,
  showLabels = true,
  showValues = true,
  animated = true,
  innerRadius = 0
}) => {
  const theme = useTheme()
  const total = data.reduce((sum, item) => sum + item.value, 0)
  const radius = Math.min(width, height) / 2 - 40
  const centerX = width / 2
  const centerY = height / 2

  const getSliceColor = (index: number) => {
    const colors = ['$blue9', '$green9', '$red9', '$yellow9', '$purple9', '$orange9']
    return colors[index % colors.length]
  }

  let currentAngle = 0

  return (
    <YStack bg="$background" br="$4" p="$4" w={width} h={height}>
      {title && (
        <Text fontSize="$6" fontWeight="600" ta="center" mb="$3">
          {title}
        </Text>
      )}
      
      <YStack f={1} ai="center" jc="center" pos="relative">
        {/* Chart */}
        <YStack w={width} h={height - 60} pos="relative">
          {data.map((item, index) => {
            const sliceAngle = (item.value / total) * 360
            const startAngle = currentAngle
            const endAngle = currentAngle + sliceAngle
            currentAngle = endAngle
            
            const midAngle = (startAngle + endAngle) / 2
            const labelRadius = radius * 0.7
            const labelX = centerX + Math.cos((midAngle - 90) * Math.PI / 180) * labelRadius
            const labelY = centerY + Math.sin((midAngle - 90) * Math.PI / 180) * labelRadius
            
            return (
              <React.Fragment key={index}>
                {/* Slice */}
                <Circle
                  pos="absolute"
                  l={centerX - radius}
                  t={centerY - radius}
                  size={radius * 2}
                  bg={item.color || getSliceColor(index)}
                  animation={animated ? 'bouncy' : undefined}
                  enterStyle={animated ? { scale: 0, rotation: -180 } : undefined}
                  hoverStyle={{ scale: 1.05 }}
                  pressStyle={{ scale: 0.95 }}
                  style={{
                    clipPath: `polygon(50% 50%, 
                      ${50 + 50 * Math.cos((startAngle - 90) * Math.PI / 180)}% 
                      ${50 + 50 * Math.sin((startAngle - 90) * Math.PI / 180)}%, 
                      ${50 + 50 * Math.cos((endAngle - 90) * Math.PI / 180)}% 
                      ${50 + 50 * Math.sin((endAngle - 90) * Math.PI / 180)}%)`
                  }}
                />
                
                {/* Inner circle for donut chart */}
                {innerRadius > 0 && index === 0 && (
                  <Circle
                    pos="absolute"
                    l={centerX - innerRadius}
                    t={centerY - innerRadius}
                    size={innerRadius * 2}
                    bg="$background"
                    zIndex={10}
                  />
                )}
                
                {/* Label */}
                {showLabels && (
                  <YStack
                    pos="absolute"
                    l={labelX - 30}
                    t={labelY - 10}
                    w={60}
                    ai="center"
                    jc="center"
                    zIndex={20}
                  >
                    <Text fontSize="$3" color="white" fontWeight="600" ta="center">
                      {item.label}
                    </Text>
                    {showValues && (
                      <Text fontSize="$2" color="white" ta="center">
                        {Math.round((item.value / total) * 100)}%
                      </Text>
                    )}
                  </YStack>
                )}
              </React.Fragment>
            )
          })}
        </YStack>
        
        {/* Legend */}
        <XStack gap="$3" flexWrap="wrap" jc="center" mt="$3">
          {data.map((item, index) => (
            <XStack key={index} ai="center" gap="$2">
              <Circle size={12} bg={item.color || getSliceColor(index)} />
              <Text fontSize="$3" color="$gray11">
                {item.label}: {item.value}
              </Text>
            </XStack>
          ))}
        </XStack>
      </YStack>
    </YStack>
  )
}

// =============================================================================
// DASHBOARD WITH NESTED TABLES AND CHARTS
// =============================================================================

const DashboardExample = () => {
  const [selectedUsers, setSelectedUsers] = useState<any[]>([])
  const [selectedOrders, setSelectedOrders] = useState<any[]>([])

  // Sample nested data
  const userData = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Admin',
      status: 'Active',
      department: 'Engineering',
      orders: [
        { id: 101, product: 'Laptop', amount: 1200, date: '2024-01-15' },
        { id: 102, product: 'Mouse', amount: 25, date: '2024-01-16' },
      ]
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'User',
      status: 'Active',
      department: 'Marketing',
      orders: [
        { id: 201, product: 'Keyboard', amount: 75, date: '2024-01-17' },
        { id: 202, product: 'Monitor', amount: 300, date: '2024-01-18' },
      ]
    },
    {
      id: 3,
      name: 'Bob Johnson',
      email: 'bob@example.com',
      role: 'Manager',
      status: 'Inactive',
      department: 'Sales',
      orders: [
        { id: 301, product: 'Tablet', amount: 500, date: '2024-01-19' },
      ]
    }
  ]

  const userColumns: NestedColumn[] = [
    { 
      field: 'name', 
      header: 'Name', 
      sortable: true,
      expandable: true
    },
    { field: 'email', header: 'Email', sortable: true },
    { field: 'department', header: 'Department', sortable: true },
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

  const orderColumns: NestedColumn[] = [
    { field: 'product', header: 'Product', sortable: true },
    { field: 'amount', header: 'Amount', sortable: true, render: (value) => `$${value}` },
    { field: 'date', header: 'Date', sortable: true },
  ]

  // Chart data
  const salesData: ChartDataPoint[] = [
    { label: 'Jan', value: 4000 },
    { label: 'Feb', value: 3000 },
    { label: 'Mar', value: 5000 },
    { label: 'Apr', value: 4500 },
    { label: 'May', value: 6000 },
    { label: 'Jun', value: 5500 },
  ]

  const departmentData: ChartDataPoint[] = [
    { label: 'Engineering', value: 45 },
    { label: 'Marketing', value: 25 },
    { label: 'Sales', value: 20 },
    { label: 'HR', value: 10 },
  ]

  const statusData: ChartDataPoint[] = [
    { label: 'Active', value: 75 },
    { label: 'Inactive', value: 20 },
    { label: 'Pending', value: 5 },
  ]

  const expandedRowRender = (row: any) => (
    <YStack gap="$3">
      <H5>Orders for {row.name}</H5>
      <NestedDataTable
        data={row.orders || []}
        columns={orderColumns}
        paginator={false}
        selection={selectedOrders}
        onSelectionChange={setSelectedOrders}
        size="small"
        density="compact"
        emptyMessage="No orders found"
      />
    </YStack>
  )

  return (
    <ScrollView f={1} p="$4">
      <YStack gap="$6">
        <H3>Advanced Dashboard with Nested Tables & Charts</H3>

        {/* Charts Row */}
        <XStack gap="$4" flexWrap="wrap">
          <BarChart
            data={salesData}
            title="Monthly Sales"
            width={400}
            height={300}
            showValues
            animated
          />
          <LineChart
            data={salesData}
            title="Sales Trend"
            width={400}
            height={300}
            showPoints
            animated
          />
          <PieChart
            data={departmentData}
            title="Department Distribution"
            width={350}
            height={350}
            showLabels
            animated
          />
        </XStack>

        {/* Advanced Data Table */}
        <YStack>
          <H4>User Management with Nested Orders</H4>
          <NestedDataTable
            data={userData}
            columns={userColumns}
            expandedRowRender={expandedRowRender}
            paginator
            rows={5}
            selection={selectedUsers}
            onSelectionChange={setSelectedUsers}
            rowExpansion
            exportable
            resizableColumns
            editMode="cell"
            onCellEdit={(row, field, value) => {
              console.log('Cell edited:', row, field, value)
            }}
            globalFilter=""
            groupBy="department"
            showGridlines
            stripedRows
            size="normal"
            density="comfortable"
            scrollHeight={500}
          />
        </YStack>

        {/* Status Chart */}
        <XStack gap="$4">
          <PieChart
            data={statusData}
            title="User Status Distribution"
            width={300}
            height={300}
            innerRadius={60}
            animated
          />
          <YStack f={1} jc="center" gap="$4">
            <H4>Quick Stats</H4>
            <XStack gap="$4">
              <Card p="$4" f={1} bg="$blue2">
                <XStack ai="center" gap="$3">
                  <Circle size={40} bg="$blue9" ai="center" jc="center">
                    <Users size={20} color="white" />
                  </Circle>
                  <YStack>
                    <Text fontSize="$6" fontWeight="600">156</Text>
                    <Text fontSize="$3" color="$gray11">Total Users</Text>
                  </YStack>
                </XStack>
              </Card>
              <Card p="$4" f={1} bg="$green2">
                <XStack ai="center" gap="$3">
                  <Circle size={40} bg="$green9" ai="center" jc="center">
                    <DollarSign size={20} color="white" />
                  </Circle>
                  <YStack>
                    <Text fontSize="$6" fontWeight="600">$12.5K</Text>
                    <Text fontSize="$3" color="$gray11">Revenue</Text>
                  </YStack>
                </XStack>
              </Card>
            </XStack>
          </YStack>
        </XStack>
      </YStack>
    </ScrollView>
  )
}

export default DashboardExample
export { NestedDataTable, BarChart, LineChart, PieChart }