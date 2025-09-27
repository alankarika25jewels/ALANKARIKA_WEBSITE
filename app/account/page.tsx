"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { 
  User, 
  Package, 
  MapPin, 
  Phone, 
  Mail, 
  Edit,
  CheckCircle,
  Clock,
  Truck,
  LogOut
} from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "@/hooks/use-toast"

export default function AccountPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("profile")
  const [isEditing, setIsEditing] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: ""
  })

  // Check authentication and fetch user data
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me', {
          credentials: 'include'
        })
        if (response.ok) {
          const userData = await response.json()
          setIsAuthenticated(true)
          setUser(userData)
          setProfileData({
            firstName: userData.firstName || "",
            lastName: userData.lastName || "",
            email: userData.email || "",
            phone: userData.phone || "",
            address: userData.address || "",
            city: userData.city || "",
            state: userData.state || "",
            zipCode: userData.zipCode || ""
          })
          
          // Fetch user orders
          await fetchUserOrders(userData._id)
        } else {
          // Redirect to login if not authenticated
          router.push('/account')
          toast({
            title: "Authentication Required",
            description: "Please log in to view your account",
            variant: "destructive",
          })
        }
      } catch (error) {
        router.push('/account')
        toast({
          title: "Authentication Error",
          description: "Please log in to continue",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [router])

  // Fetch user orders
  const fetchUserOrders = async (userId: string) => {
    try {
      const response = await fetch(`/api/orders?userId=${userId}`, {
        credentials: 'include'
      })
      if (response.ok) {
        const data = await response.json()
        setOrders(data.orders || [])
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error)
    }
  }

  // Handle logout
  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      })
      if (response.ok) {
        setIsAuthenticated(false)
        setUser(null)
        router.push('/')
        toast({
          title: "Logged Out",
          description: "You have been successfully logged out",
        })
      }
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  // Handle profile update
  const handleProfileUpdate = async () => {
    try {
      const response = await fetch('/api/auth/update-profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(profileData)
      })
      
      if (response.ok) {
        setIsEditing(false)
        toast({
          title: "Profile Updated",
          description: "Your profile has been updated successfully",
        })
      } else {
        toast({
          title: "Update Failed",
          description: "Failed to update profile. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Update Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="h-20"></div>
        <div className="flex items-center justify-center min-h-[calc(100vh-120px)]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B7355] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your account...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="h-20"></div>
        <div className="flex items-center justify-center min-h-[calc(100vh-120px)]">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <CardTitle>Login Required</CardTitle>
              <CardDescription>Please log in to view your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                onClick={() => router.push('/checkout')} 
                className="w-full bg-[#8B7355] hover:bg-[#D4AF37] text-white"
              >
                Login / Register
              </Button>
              <Button 
                variant="outline" 
                onClick={() => router.push('/')} 
                className="w-full"
              >
                Continue Shopping
              </Button>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    )
  }


  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800"
      case "Shipped":
        return "bg-blue-100 text-blue-800"
      case "Processing":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Delivered":
        return <CheckCircle className="w-4 h-4" />
      case "Shipped":
        return <Truck className="w-4 h-4" />
      case "Processing":
        return <Clock className="w-4 h-4" />
      default:
        return <Package className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {/* Top spacing to prevent navbar overlap */}
      <div className="h-20"></div>
      <div className="py-8 md:py-12">
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="mb-6 md:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-light text-gray-900">Welcome, {user?.firstName}</h1>
            <p className="text-gray-600 mt-2 text-sm md:text-base">Manage your profile, orders, and preferences</p>
          </div>
          <Button 
            onClick={handleLogout}
            variant="outline"
            className="flex items-center space-x-2 text-sm md:text-base"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 md:space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="profile" className="flex items-center space-x-1 md:space-x-2 text-xs md:text-sm">
              <User className="w-3 h-3 md:w-4 md:h-4" />
              <span>Profile</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center space-x-1 md:space-x-2 text-xs md:text-sm">
              <Package className="w-3 h-3 md:w-4 md:h-4" />
              <span>Orders</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-4 md:space-y-6">
            <Card>
              <CardHeader className="p-4 md:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle className="text-lg md:text-xl">Personal Information</CardTitle>
                    <CardDescription className="text-sm md:text-base">Update your personal details and contact information</CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center space-x-2 text-sm md:text-base"
                  >
                    <Edit className="w-4 h-4" />
                    <span>{isEditing ? 'Cancel' : 'Edit'}</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-4 md:p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={profileData.firstName}
                      onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                      disabled={!isEditing}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={profileData.lastName}
                      onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                      disabled={!isEditing}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      disabled={!isEditing}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      disabled={!isEditing}
                      className="mt-2"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={profileData.address}
                      onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                      disabled={!isEditing}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={profileData.city}
                      onChange={(e) => setProfileData({...profileData, city: e.target.value})}
                      disabled={!isEditing}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      value={profileData.state}
                      onChange={(e) => setProfileData({...profileData, state: e.target.value})}
                      disabled={!isEditing}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="zipCode">ZIP Code</Label>
                    <Input
                      id="zipCode"
                      value={profileData.zipCode}
                      onChange={(e) => setProfileData({...profileData, zipCode: e.target.value})}
                      disabled={!isEditing}
                      className="mt-2"
                    />
                  </div>
                </div>
                
                {isEditing && (
                  <div className="flex justify-end space-x-3 mt-6 pt-6 border-t">
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleProfileUpdate} className="bg-[#8B7355] hover:bg-[#D4AF37] text-white">
                      Save Changes
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
                <CardDescription>Track your orders and view order details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-900">Order {order.id}</h3>
                          <p className="text-sm text-gray-500">Placed on {order.date}</p>
                        </div>
                        <Badge className={getStatusColor(order.status)}>
                          <div className="flex items-center space-x-1">
                            {getStatusIcon(order.status)}
                            <span>{order.status}</span>
                          </div>
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span>{item.name} × {item.quantity}</span>
                            <span>₹{item.price.toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="border-t pt-3 mt-3 flex justify-between items-center">
                        <span className="font-semibold">Total: ₹{order.total.toFixed(2)}</span>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  )
}
