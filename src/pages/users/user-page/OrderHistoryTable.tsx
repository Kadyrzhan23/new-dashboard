import { useState } from "react";
import { Card } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Input } from "../../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { Filter, Search } from "lucide-react";

interface Order {
  id: string;
  date: string;
  products: string[];
  quantity: number;
  total: number;
  status: "completed" | "pending" | "cancelled" | "processing";
  paymentType: string;
}

interface OrderHistoryTableProps {
  orders: Order[];
}

export function OrderHistoryTable({ orders }: OrderHistoryTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [paymentFilter, setPaymentFilter] = useState<string>("all");

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.products.some((p) => p.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    const matchesPayment = paymentFilter === "all" || order.paymentType === paymentFilter;

    return matchesSearch && matchesStatus && matchesPayment;
  });

  const getStatusVariant = (status: Order["status"]) => {
    switch (status) {
      case "completed":
        return "default";
      case "pending":
        return "secondary";
      case "cancelled":
        return "destructive";
      case "processing":
        return "outline";
      default:
        return "secondary";
    }
  };

  return (
    <Card className="p-4 sm:p-6 md:p-8 shadow-sm border border-gray-200">
      <div className="mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl mb-4 sm:mb-6">Order History</h2>

        {/* Filters */}
        <div className="flex flex-col gap-3 sm:gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <Input
              placeholder="Search by order ID or product..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <SelectValue placeholder="Status" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>

            <Select value={paymentFilter} onValueChange={setPaymentFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <SelectValue placeholder="Payment" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Payment</SelectItem>
                <SelectItem value="Credit Card">Credit Card</SelectItem>
                <SelectItem value="Debit Card">Debit Card</SelectItem>
                <SelectItem value="PayPal">PayPal</SelectItem>
                <SelectItem value="Cash">Cash</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Table with horizontal scroll on mobile */}
      <div className="border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <Table className="min-w-[640px]">
            <TableHeader>
              <TableRow className="bg-neutral-50">
                <TableHead className="whitespace-nowrap">Order ID</TableHead>
                <TableHead className="whitespace-nowrap">Date</TableHead>
                <TableHead className="whitespace-nowrap">Products</TableHead>
                <TableHead className="text-center whitespace-nowrap">Quantity</TableHead>
                <TableHead className="text-right whitespace-nowrap">Total</TableHead>
                <TableHead className="whitespace-nowrap">Status</TableHead>
                <TableHead className="whitespace-nowrap">Payment Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-neutral-500">
                    No orders found
                  </TableCell>
                </TableRow>
              ) : (
                filteredOrders.map((order) => (
                  <TableRow key={order.id} className="hover:bg-neutral-50">
                    <TableCell className="font-medium whitespace-nowrap">#{order.id}</TableCell>
                    <TableCell className="text-neutral-600 whitespace-nowrap">{order.date}</TableCell>
                    <TableCell>
                      <div className="max-w-[200px] lg:max-w-xs">
                        <span className="text-sm text-neutral-700">
                          {order.products.join(", ")}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">{order.quantity}</TableCell>
                    <TableCell className="text-right whitespace-nowrap">${order.total.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(order.status)}>
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-neutral-600 whitespace-nowrap">{order.paymentType}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Results Count */}
      <div className="mt-4 text-xs sm:text-sm text-neutral-500">
        Showing {filteredOrders.length} of {orders.length} orders
      </div>
    </Card>
  );
}