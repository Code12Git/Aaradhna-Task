import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Plus, Eye, PenSquare, BarChart2 } from "lucide-react";
import { motion } from "framer-motion";

const Dashboard = () => {
  // Mock data
  const stats = [
    { label: "Total Posts", value: 24, icon: <FileText className="h-5 w-5" /> },
    { label: "Published", value: 18, icon: <Eye className="h-5 w-5" /> },
    { label: "Drafts", value: 6, icon: <PenSquare className="h-5 w-5" /> },
  ];

  const recentPosts = [
    { title: "Next.js 14 Performance Tips", views: "1.2K", date: "2 days ago" },
    { title: "CSS Container Queries Guide", views: "856", date: "1 week ago" },
    { title: "React Server Components Deep Dive", views: "2.3K", date: "2 weeks ago" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-6 max-w-6xl mx-auto"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <motion.h1 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
        >
          Blog Dashboard
        </motion.h1>
        <Button className="gap-2 shadow-md hover:shadow-lg transition-shadow">
          <Plus className="h-4 w-4" />
          New Post
        </Button>
      </div>

      {/* Stats Cards */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { staggerChildren: 0.1 } }}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            whileHover={{ y: -5 }}
          >
            <Card className="h-full border border-gray-200 shadow-sm hover:shadow-md transition-all">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-500">
                  {stat.label}
                </CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{stat.value}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Recent Posts */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-500" />
              Recent Posts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPosts.map((post, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.01 }}
                  className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div>
                    <h3 className="font-medium">{post.title}</h3>
                    <p className="text-sm text-gray-500">
                      {post.views} views • {post.date}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div 
        className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.3 } }}
      >
        <Button variant="outline" className="h-24 flex-col gap-2">
          <BarChart2 className="h-6 w-6" />
          Analytics
        </Button>
        <Button variant="outline" className="h-24 flex-col gap-2">
          <PenSquare className="h-6 w-6" />
          Write Draft
        </Button>
        <Button variant="outline" className="h-24 flex-col gap-2">
          <Eye className="h-6 w-6" />
          View Live
        </Button>
        <Button variant="outline" className="h-24 flex-col gap-2">
          <FileText className="h-6 w-6" />
          All Posts
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;