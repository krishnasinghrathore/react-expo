import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from 'primereact/card';
import { Chart } from 'primereact/chart';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Dialog } from 'primereact/dialog';
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar';
import { Panel } from 'primereact/panel';
import { Toolbar } from 'primereact/toolbar';
import { Divider } from 'primereact/divider';
import { ProgressBar } from 'primereact/progressbar';
import { Tag } from 'primereact/tag';
import { Timeline } from 'primereact/timeline';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import { Menu } from 'primereact/menu';
import { Menubar } from 'primereact/menubar';
import { TabView, TabPanel } from 'primereact/tabview';

// Import PrimeReact CSS
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

interface Customer {
  id: number;
  name: string;
  email: string;
  country: string;
  company: string;
  date: string;
  status: string;
  activity: number;
  representative: string;
}

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
  rating: number;
  inventoryStatus: string;
}

interface Order {
  id: string;
  customer: string;
  date: string;
  amount: number;
  status: string;
  product: string;
}

const PrimeReactDashboard: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [globalFilter, setGlobalFilter] = useState('');
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  // Sample data
  useEffect(() => {
    // Customers data
    const customersData: Customer[] = [
      {
        id: 1,
        name: 'John Smith',
        email: 'john.smith@example.com',
        country: 'USA',
        company: 'Tech Corp',
        date: '2024-01-15',
        status: 'active',
        activity: 85,
        representative: 'Amy Elsner'
      },
      {
        id: 2,
        name: 'Sarah Johnson',
        email: 'sarah.johnson@example.com',
        country: 'Canada',
        company: 'Design Studio',
        date: '2024-01-10',
        status: 'inactive',
        activity: 42,
        representative: 'Anna Fali'
      },
      {
        id: 3,
        name: 'Michael Brown',
        email: 'michael.brown@example.com',
        country: 'UK',
        company: 'Innovation Lab',
        date: '2024-01-20',
        status: 'active',
        activity: 78,
        representative: 'Asiya Javayant'
      },
      {
        id: 4,
        name: 'Emily Davis',
        email: 'emily.davis@example.com',
        country: 'Australia',
        company: 'Creative Agency',
        date: '2024-01-12',
        status: 'pending',
        activity: 65,
        representative: 'Bernardo Dominic'
      },
      {
        id: 5,
        name: 'David Wilson',
        email: 'david.wilson@example.com',
        country: 'Germany',
        company: 'Digital Solutions',
        date: '2024-01-18',
        status: 'active',
        activity: 92,
        representative: 'Elwin Sharvill'
      }
    ];

    // Products data
    const productsData: Product[] = [
      {
        id: 1,
        name: 'Laptop Pro',
        category: 'Electronics',
        price: 1299.99,
        quantity: 45,
        rating: 4.8,
        inventoryStatus: 'INSTOCK'
      },
      {
        id: 2,
        name: 'Wireless Mouse',
        category: 'Electronics',
        price: 29.99,
        quantity: 120,
        rating: 4.2,
        inventoryStatus: 'INSTOCK'
      },
      {
        id: 3,
        name: 'Desk Chair',
        category: 'Furniture',
        price: 199.99,
        quantity: 8,
        rating: 4.5,
        inventoryStatus: 'LOWSTOCK'
      },
      {
        id: 4,
        name: 'Monitor 4K',
        category: 'Electronics',
        price: 399.99,
        quantity: 0,
        rating: 4.7,
        inventoryStatus: 'OUTOFSTOCK'
      },
      {
        id: 5,
        name: 'Keyboard',
        category: 'Electronics',
        price: 79.99,
        quantity: 85,
        rating: 4.1,
        inventoryStatus: 'INSTOCK'
      }
    ];

    // Orders data
    const ordersData: Order[] = [
      {
        id: 'ORD-001',
        customer: 'John Smith',
        date: '2024-01-15',
        amount: 1299.99,
        status: 'completed',
        product: 'Laptop Pro'
      },
      {
        id: 'ORD-002',
        customer: 'Sarah Johnson',
        date: '2024-01-14',
        amount: 29.99,
        status: 'pending',
        product: 'Wireless Mouse'
      },
      {
        id: 'ORD-003',
        customer: 'Michael Brown',
        date: '2024-01-13',
        amount: 199.99,
        status: 'shipped',
        product: 'Desk Chair'
      },
      {
        id: 'ORD-004',
        customer: 'Emily Davis',
        date: '2024-01-12',
        amount: 399.99,
        status: 'processing',
        product: 'Monitor 4K'
      },
      {
        id: 'ORD-005',
        customer: 'David Wilson',
        date: '2024-01-11',
        amount: 79.99,
        status: 'completed',
        product: 'Keyboard'
      }
    ];

    setCustomers(customersData);
    setProducts(productsData);
    setOrders(ordersData);

    // Chart data
    const data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June'],
      datasets: [
        {
          label: 'Sales',
          data: [65, 59, 80, 81, 56, 55],
          fill: false,
          backgroundColor: '#3b82f6',
          borderColor: '#3b82f6',
          tension: 0.4
        },
        {
          label: 'Revenue',
          data: [28, 48, 40, 19, 86, 27],
          fill: false,
          backgroundColor: '#10b981',
          borderColor: '#10b981',
          tension: 0.4
        }
      ]
    };

    const options = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: '#495057'
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#495057'
          },
          grid: {
            color: '#ebedef'
          }
        },
        y: {
          ticks: {
            color: '#495057'
          },
          grid: {
            color: '#ebedef'
          }
        }
      }
    };

    setChartData(data);
    setChartOptions(options);
  }, []);

  // Status body templates
  const statusBodyTemplate = (rowData: Customer) => {
    const severity = rowData.status === 'active' ? 'success' : 
                    rowData.status === 'inactive' ? 'danger' : 'warning';
    return <Tag value={rowData.status} severity={severity} />;
  };

  const activityBodyTemplate = (rowData: Customer) => {
    return <ProgressBar value={rowData.activity} />;
  };

  const inventoryStatusBodyTemplate = (rowData: Product) => {
    const severity = rowData.inventoryStatus === 'INSTOCK' ? 'success' : 
                    rowData.inventoryStatus === 'LOWSTOCK' ? 'warning' : 'danger';
    return <Tag value={rowData.inventoryStatus} severity={severity} />;
  };

  const priceBodyTemplate = (rowData: Product) => {
    return `$${rowData.price.toFixed(2)}`;
  };

  const orderStatusBodyTemplate = (rowData: Order) => {
    const severity = rowData.status === 'completed' ? 'success' : 
                    rowData.status === 'pending' ? 'warning' : 
                    rowData.status === 'shipped' ? 'info' : 'secondary';
    return <Tag value={rowData.status} severity={severity} />;
  };

  const orderAmountBodyTemplate = (rowData: Order) => {
    return `$${rowData.amount.toFixed(2)}`;
  };

  // Menu items
  const menuItems = [
    {
      label: 'Dashboard',
      icon: 'pi pi-home',
      command: () => console.log('Dashboard clicked')
    },
    {
      label: 'Customers',
      icon: 'pi pi-users',
      command: () => console.log('Customers clicked')
    },
    {
      label: 'Products',
      icon: 'pi pi-box',
      command: () => console.log('Products clicked')
    },
    {
      label: 'Orders',
      icon: 'pi pi-shopping-cart',
      command: () => console.log('Orders clicked')
    },
    {
      label: 'Reports',
      icon: 'pi pi-chart-bar',
      command: () => console.log('Reports clicked')
    }
  ];

  // Timeline events
  const timelineEvents = [
    { status: 'New Order', date: '15/01/2024 10:30', icon: 'pi pi-shopping-cart', color: '#3b82f6' },
    { status: 'Payment Received', date: '15/01/2024 11:15', icon: 'pi pi-check', color: '#10b981' },
    { status: 'Order Shipped', date: '16/01/2024 09:00', icon: 'pi pi-send', color: '#f59e0b' },
    { status: 'Delivered', date: '18/01/2024 14:30', icon: 'pi pi-check-circle', color: '#10b981' }
  ];

  // Toolbar content
  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button label="New" icon="pi pi-plus" severity="success" className="mr-2" />
        <Button label="Delete" icon="pi pi-trash" severity="danger" />
      </div>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button label="Export" icon="pi pi-upload" className="p-button-help" />
      </div>
    );
  };

  // Global filter
  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 className="m-0">Customers</h4>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter((e.target as HTMLInputElement).value)}
          placeholder="Search..."
        />
      </span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <Menubar model={menuItems} className="border-none" />
      </div>

      {/* Main Content */}
      <div className="p-4">
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome to your PrimeReact Admin Dashboard</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="bg-blue-50 border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm font-medium">Total Customers</p>
                <p className="text-2xl font-bold text-blue-900">{customers.length}</p>
              </div>
              <div className="bg-blue-500 p-3 rounded-full">
                <i className="pi pi-users text-white text-xl"></i>
              </div>
            </div>
          </Card>

          <Card className="bg-green-50 border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-sm font-medium">Total Products</p>
                <p className="text-2xl font-bold text-green-900">{products.length}</p>
              </div>
              <div className="bg-green-500 p-3 rounded-full">
                <i className="pi pi-box text-white text-xl"></i>
              </div>
            </div>
          </Card>

          <Card className="bg-orange-50 border-orange-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-600 text-sm font-medium">Total Orders</p>
                <p className="text-2xl font-bold text-orange-900">{orders.length}</p>
              </div>
              <div className="bg-orange-500 p-3 rounded-full">
                <i className="pi pi-shopping-cart text-white text-xl"></i>
              </div>
            </div>
          </Card>

          <Card className="bg-purple-50 border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600 text-sm font-medium">Revenue</p>
                <p className="text-2xl font-bold text-purple-900">$12,345</p>
              </div>
              <div className="bg-purple-500 p-3 rounded-full">
                <i className="pi pi-dollar text-white text-xl"></i>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <TabView>
          <TabPanel header="Overview" leftIcon="pi pi-chart-line">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card title="Sales Analytics">
                <Chart type="line" data={chartData} options={chartOptions} style={{ height: '400px' }} />
              </Card>

              <Card title="Recent Activity">
                <Timeline value={timelineEvents} align="left" className="customized-timeline" 
                  marker={(item) => <span className="custom-marker" style={{ backgroundColor: item.color }}><i className={item.icon}></i></span>} 
                  content={(item) => (
                    <div>
                      <p className="font-semibold text-gray-900">{item.status}</p>
                      <p className="text-sm text-gray-500">{item.date}</p>
                    </div>
                  )} />
              </Card>
            </div>
          </TabPanel>

          <TabPanel header="Customers" leftIcon="pi pi-users">
            <Card>
              <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate} />
              <DataTable
                value={customers}
                selection={selectedCustomer}
                onSelectionChange={(e) => setSelectedCustomer(e.value)}
                dataKey="id"
                paginator
                rows={10}
                rowsPerPageOptions={[5, 10, 25]}
                className="datatable-responsive"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} customers"
                globalFilter={globalFilter}
                header={header}
              >
                <Column selectionMode="single" headerStyle={{ width: '3rem' }} />
                <Column field="name" header="Name" sortable />
                <Column field="email" header="Email" sortable />
                <Column field="country" header="Country" sortable />
                <Column field="company" header="Company" sortable />
                <Column field="date" header="Date" sortable />
                <Column field="status" header="Status" body={statusBodyTemplate} sortable />
                <Column field="activity" header="Activity" body={activityBodyTemplate} sortable />
              </DataTable>
            </Card>
          </TabPanel>

          <TabPanel header="Products" leftIcon="pi pi-box">
            <Card>
              <DataTable
                value={products}
                paginator
                rows={10}
                rowsPerPageOptions={[5, 10, 25]}
                className="datatable-responsive"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
              >
                <Column field="name" header="Product Name" sortable />
                <Column field="category" header="Category" sortable />
                <Column field="price" header="Price" body={priceBodyTemplate} sortable />
                <Column field="quantity" header="Quantity" sortable />
                <Column field="rating" header="Rating" sortable />
                <Column field="inventoryStatus" header="Status" body={inventoryStatusBodyTemplate} sortable />
              </DataTable>
            </Card>
          </TabPanel>

          <TabPanel header="Orders" leftIcon="pi pi-shopping-cart">
            <Card>
              <DataTable
                value={orders}
                paginator
                rows={10}
                rowsPerPageOptions={[5, 10, 25]}
                className="datatable-responsive"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} orders"
              >
                <Column field="id" header="Order ID" sortable />
                <Column field="customer" header="Customer" sortable />
                <Column field="product" header="Product" sortable />
                <Column field="date" header="Date" sortable />
                <Column field="amount" header="Amount" body={orderAmountBodyTemplate} sortable />
                <Column field="status" header="Status" body={orderStatusBodyTemplate} sortable />
              </DataTable>
            </Card>
          </TabPanel>
        </TabView>
      </div>

      {/* Dialog */}
      <Dialog 
        header="Customer Details" 
        visible={isDialogVisible} 
        style={{ width: '50vw' }} 
        onHide={() => setIsDialogVisible(false)}
      >
        <p>Customer details would go here...</p>
      </Dialog>
    </div>
  );
};

export default PrimeReactDashboard;