import React from 'react';
import { View } from 'react-native';
import { Card } from 'primereact/card';
import { Chart } from 'primereact/chart';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { ProgressBar } from 'primereact/progressbar';

export default function DashboardPage() {
  // Sample data for charts
  const chartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Sales',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: '#42A5F5',
        tension: 0.4
      },
      {
        label: 'Revenue',
        data: [28, 48, 40, 19, 86, 27, 90],
        fill: false,
        borderColor: '#FFA726',
        tension: 0.4
      }
    ]
  };

  const chartOptions = {
    maintainAspectRatio: false,
    aspectRatio: 0.6,
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

  // Sample data for recent orders
  const recentOrders = [
    { id: 1001, customer: 'John Doe', date: '2024-01-15', amount: 125.50, status: 'Delivered' },
    { id: 1002, customer: 'Jane Smith', date: '2024-01-15', amount: 89.00, status: 'Processing' },
    { id: 1003, customer: 'Bob Johnson', date: '2024-01-14', amount: 250.75, status: 'Shipped' },
    { id: 1004, customer: 'Alice Brown', date: '2024-01-14', amount: 175.25, status: 'Pending' },
    { id: 1005, customer: 'Charlie Wilson', date: '2024-01-13', amount: 320.00, status: 'Delivered' }
  ];

  const statusBodyTemplate = (rowData: any) => {
    const severity = {
      'Delivered': 'success',
      'Processing': 'info',
      'Shipped': 'warning',
      'Pending': 'danger'
    }[rowData.status] || 'info';

    return <Tag value={rowData.status} severity={severity as any} />;
  };

  const amountBodyTemplate = (rowData: any) => {
    return `$${rowData.amount.toFixed(2)}`;
  };

  return (
    <div className="dashboard-page">
      <div className="page-header mb-4">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your business today.</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid">
        <div className="col-12 md:col-6 lg:col-3">
          <Card className="mb-0">
            <div className="flex justify-content-between mb-3">
              <div>
                <span className="block text-500 font-medium mb-3">Total Revenue</span>
                <div className="text-900 font-medium text-xl">$45,320</div>
              </div>
              <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{width: '2.5rem', height: '2.5rem'}}>
                <i className="pi pi-dollar text-blue-500 text-xl"></i>
              </div>
            </div>
            <span className="text-green-500 font-medium">24% </span>
            <span className="text-500">increase</span>
          </Card>
        </div>
        
        <div className="col-12 md:col-6 lg:col-3">
          <Card className="mb-0">
            <div className="flex justify-content-between mb-3">
              <div>
                <span className="block text-500 font-medium mb-3">Orders</span>
                <div className="text-900 font-medium text-xl">152</div>
              </div>
              <div className="flex align-items-center justify-content-center bg-orange-100 border-round" style={{width: '2.5rem', height: '2.5rem'}}>
                <i className="pi pi-shopping-cart text-orange-500 text-xl"></i>
              </div>
            </div>
            <span className="text-green-500 font-medium">52% </span>
            <span className="text-500">since last week</span>
          </Card>
        </div>
        
        <div className="col-12 md:col-6 lg:col-3">
          <Card className="mb-0">
            <div className="flex justify-content-between mb-3">
              <div>
                <span className="block text-500 font-medium mb-3">Customers</span>
                <div className="text-900 font-medium text-xl">1,352</div>
              </div>
              <div className="flex align-items-center justify-content-center bg-cyan-100 border-round" style={{width: '2.5rem', height: '2.5rem'}}>
                <i className="pi pi-users text-cyan-500 text-xl"></i>
              </div>
            </div>
            <span className="text-red-500 font-medium">-2% </span>
            <span className="text-500">since last month</span>
          </Card>
        </div>
        
        <div className="col-12 md:col-6 lg:col-3">
          <Card className="mb-0">
            <div className="flex justify-content-between mb-3">
              <div>
                <span className="block text-500 font-medium mb-3">Comments</span>
                <div className="text-900 font-medium text-xl">85</div>
              </div>
              <div className="flex align-items-center justify-content-center bg-purple-100 border-round" style={{width: '2.5rem', height: '2.5rem'}}>
                <i className="pi pi-comment text-purple-500 text-xl"></i>
              </div>
            </div>
            <span className="text-green-500 font-medium">12% </span>
            <span className="text-500">responded</span>
          </Card>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid mt-4">
        <div className="col-12 lg:col-8">
          <Card title="Sales Overview">
            <Chart type="line" data={chartData} options={chartOptions} style={{ height: '350px' }} />
          </Card>
        </div>
        
        <div className="col-12 lg:col-4">
          <Card title="Sales Distribution">
            <div className="mb-3">
              <div className="flex justify-content-between align-items-center mb-2">
                <span>Electronics</span>
                <span className="font-medium">40%</span>
              </div>
              <ProgressBar value={40} showValue={false} style={{ height: '8px' }} />
            </div>
            
            <div className="mb-3">
              <div className="flex justify-content-between align-items-center mb-2">
                <span>Clothing</span>
                <span className="font-medium">25%</span>
              </div>
              <ProgressBar value={25} showValue={false} style={{ height: '8px' }} />
            </div>
            
            <div className="mb-3">
              <div className="flex justify-content-between align-items-center mb-2">
                <span>Home & Garden</span>
                <span className="font-medium">20%</span>
              </div>
              <ProgressBar value={20} showValue={false} style={{ height: '8px' }} />
            </div>
            
            <div className="mb-3">
              <div className="flex justify-content-between align-items-center mb-2">
                <span>Others</span>
                <span className="font-medium">15%</span>
              </div>
              <ProgressBar value={15} showValue={false} style={{ height: '8px' }} />
            </div>
          </Card>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="grid mt-4">
        <div className="col-12">
          <Card title="Recent Orders">
            <DataTable value={recentOrders} paginator rows={5} responsiveLayout="scroll">
              <Column field="id" header="Order ID" />
              <Column field="customer" header="Customer" />
              <Column field="date" header="Date" />
              <Column field="amount" header="Amount" body={amountBodyTemplate} />
              <Column field="status" header="Status" body={statusBodyTemplate} />
              <Column 
                header="Actions" 
                body={() => (
                  <Button icon="pi pi-eye" className="p-button-rounded p-button-text" />
                )}
              />
            </DataTable>
          </Card>
        </div>
      </div>
    </div>
  );
}