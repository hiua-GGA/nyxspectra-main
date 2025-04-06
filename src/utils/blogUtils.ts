// Blog types
export interface Author {
  name: string;
  avatar: string;
  title?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: Author;
  category: string;
  tags: string[];
  readTime: string;
  date: string;
  approved: boolean;
}

// Default blog data
const defaultBlogPosts: BlogPost[] = [
  {
    id: "how-ai-is-transforming-healthcare-documentation",
    title: "How AI is Transforming Healthcare Documentation",
    excerpt: "Discover how artificial intelligence is revolutionizing clinical documentation, reducing physician burnout, and improving patient care.",
    content: `
      <p>The healthcare industry has long battled with the challenge of documentation - a necessary administrative task that often consumes valuable time that healthcare providers could otherwise spend with patients. Enter artificial intelligence, which is transforming this landscape in remarkable ways.</p>
      
      <h2>The Documentation Burden</h2>
      <p>Studies show that physicians spend nearly 6 hours of an 11-hour workday interacting with electronic health records, with much of this time dedicated to documentation. This administrative burden is a leading contributor to physician burnout.</p>
      
      <h2>AI-Powered Solutions</h2>
      <p>Modern AI tools are changing this paradigm through several innovative approaches:</p>
      <ul>
        <li><strong>Real-time speech recognition</strong> that converts doctor-patient conversations into structured clinical notes</li>
        <li><strong>Natural language processing</strong> that extracts relevant clinical information from unstructured text</li>
        <li><strong>Automated coding</strong> that suggests appropriate medical codes for billing and record-keeping</li>
        <li><strong>Smart templates</strong> that adapt to individual provider preferences and specialty requirements</li>
      </ul>
      
      <h2>Measurable Benefits</h2>
      <p>Healthcare organizations implementing these AI documentation tools report significant improvements:</p>
      <ul>
        <li>70% reduction in time spent on documentation</li>
        <li>62% decrease in physician burnout rates</li>
        <li>35% improvement in documentation quality and completeness</li>
        <li>41% increase in face-to-face time with patients</li>
      </ul>
      
      <h2>The Future Direction</h2>
      <p>As AI technology continues to evolve, we can expect even more sophisticated documentation solutions that will further reduce administrative burden while improving clinical data quality. The eventual goal is to create a seamless documentation process that happens naturally in the background of patient care, allowing healthcare providers to focus on what matters most - their patients.</p>
    `,
    image: "/Images/blog/ai-healthcare.jpg",
    author: {
      name: "Dr. Sarah Johnson",
      avatar: "/Images/avatars/avatar-1.jpg",
      title: "Clinical Informatics Specialist"
    },
    category: "AI in Healthcare",
    tags: ["documentation", "efficiency", "burnout", "clinical workflows"],
    readTime: "6 min",
    date: "June 15, 2023",
    approved: true
  },
  {
    id: "future-of-hospital-information-systems",
    title: "The Future of Hospital Information Systems",
    excerpt: "Explore the evolution of HIS platforms and how integrations are creating a more connected healthcare ecosystem.",
    content: `
      <p>Hospital Information Systems (HIS) have come a long way from their early days as simple administrative tools. Today's healthcare landscape demands sophisticated, interconnected systems that seamlessly integrate clinical, operational, and financial data.</p>
      
      <h2>Evolution of Hospital Information Systems</h2>
      <p>The journey of HIS platforms reflects the broader digital transformation in healthcare:</p>
      <ul>
        <li><strong>First Generation (1970s-1980s):</strong> Basic administrative and billing systems with minimal clinical functionality</li>
        <li><strong>Second Generation (1990s-2000s):</strong> Introduction of electronic medical records and departmental systems</li>
        <li><strong>Third Generation (2010s):</strong> Integrated EHR systems with clinical decision support</li>
        <li><strong>Fourth Generation (Present):</strong> Cloud-based, AI-enhanced platforms with interoperability capabilities</li>
      </ul>
      
      <h2>The Integration Challenge</h2>
      <p>One of the greatest challenges facing healthcare organizations is the integration of disparate systems. Many hospitals operate dozens of different software platforms that don't naturally communicate with each other, creating data silos that impede efficient operations and comprehensive patient care.</p>
      
      <h2>FHIR and Next-Generation Interoperability</h2>
      <p>The emergence of Fast Healthcare Interoperability Resources (FHIR) as a standard for healthcare data exchange has been a game-changer. FHIR provides a common language and structure for different systems to share information, regardless of their underlying architecture or vendor.</p>
      <p>This standardization is enabling a new generation of healthcare applications that can:</p>
      <ul>
        <li>Securely access and exchange patient data across institutions</li>
        <li>Integrate with wearables and remote monitoring devices</li>
        <li>Implement AI algorithms that draw from multiple data sources</li>
        <li>Create comprehensive patient portals with consolidated information</li>
      </ul>
      
      <h2>The Connected Healthcare Ecosystem</h2>
      <p>Looking forward, we're moving toward a truly connected healthcare ecosystem where information flows seamlessly between systems, institutions, and providers. This transformation promises to enhance patient care, improve operational efficiency, and reduce healthcare costs through better resource allocation and reduced redundancy.</p>
    `,
    image: "/Images/blog/hospital-systems.jpg",
    author: {
      name: "Michael Chen",
      avatar: "/Images/avatars/avatar-2.jpg",
      title: "Healthcare IT Director"
    },
    category: "Healthcare Technology",
    tags: ["interoperability", "FHIR", "EHR", "healthcare IT"],
    readTime: "8 min",
    date: "May 22, 2023",
    approved: true
  },
  {
    id: "future-of-ai-in-healthcare",
    title: "The Future of AI in Healthcare: Transforming Patient Care",
    excerpt: "Explore how artificial intelligence is revolutionizing healthcare delivery, from diagnostics to treatment planning and beyond.",
    content: `
      <p>Artificial intelligence is poised to transform healthcare in ways we're only beginning to understand. From revolutionizing how diseases are diagnosed to personalizing treatment plans and streamlining operations, AI technologies are reshaping every aspect of healthcare delivery.</p>
      
      <h2>The Current State of AI in Healthcare</h2>
      <p>While still in relatively early stages of adoption compared to other industries, healthcare has already benefited from several AI applications:</p>
      <ul>
        <li>Diagnostic image analysis in radiology and pathology</li>
        <li>Clinical decision support systems</li>
        <li>Natural language processing for medical documentation</li>
        <li>Predictive analytics for patient deterioration</li>
        <li>Operational optimization in scheduling and resource allocation</li>
      </ul>
      
      <h2>Emerging Applications</h2>
      
      <h3>1. Precision Medicine</h3>
      <p>AI algorithms are analyzing genetic information, biomarkers, and clinical data to predict which treatments will work best for individual patients. This approach is particularly transformative in oncology, where treatment response varies greatly between patients with seemingly similar conditions.</p>
      
      <h3>2. Drug Discovery and Development</h3>
      <p>AI is accelerating the traditionally lengthy and expensive process of drug development by:</p>
      <ul>
        <li>Identifying promising molecular compounds</li>
        <li>Predicting drug-target interactions</li>
        <li>Designing novel therapeutic molecules</li>
        <li>Optimizing clinical trial design and patient selection</li>
      </ul>
      
      <h3>3. Remote Monitoring and Telehealth</h3>
      <p>AI-enhanced remote monitoring systems are extending care beyond facility walls by:</p>
      <ul>
        <li>Continuously analyzing data from wearables and home devices</li>
        <li>Detecting subtle changes in patient condition</li>
        <li>Triaging virtual care requests</li>
        <li>Providing personalized guidance through conversational AI</li>
      </ul>
      
      <h3>4. Surgical and Robotic Applications</h3>
      <p>AI is enhancing surgical precision through:</p>
      <ul>
        <li>Preoperative planning with 3D modeling</li>
        <li>Intraoperative guidance systems</li>
        <li>Robotics with computer vision capabilities</li>
        <li>Post-procedure outcome prediction and complication prevention</li>
      </ul>
      
      <h2>Challenges and Considerations</h2>
      <p>Despite its promise, several critical challenges must be addressed:</p>
      
      <h3>Data Quality and Bias</h3>
      <p>AI systems are only as good as the data they learn from. Healthcare data often contains biases reflecting disparities in care access and delivery. Ensuring representative, high-quality data is essential for creating fair and effective AI systems.</p>
      
      <h3>Integration and Workflow</h3>
      <p>For AI to deliver on its promise, solutions must integrate seamlessly into clinical workflows rather than adding technology burden to already busy healthcare professionals.</p>
      
      <h3>Regulatory Frameworks</h3>
      <p>Regulatory approaches to AI in healthcare are still evolving. Finding the right balance between innovation and patient safety remains an ongoing challenge.</p>
      
      <h3>Trust and Explainability</h3>
      <p>Healthcare providers need to understand how AI reaches its conclusions to trust and appropriately apply its recommendations, making "black box" algorithms problematic in clinical settings.</p>
      
      <h2>The Path Forward</h2>
      <p>The most successful implementation of AI in healthcare will likely follow these principles:</p>
      <ul>
        <li>Human-centered design that augments rather than replaces clinical expertise</li>
        <li>Collaborative development involving clinicians, data scientists, and patients</li>
        <li>Rigorous validation in diverse clinical settings</li>
        <li>Ongoing monitoring and refinement based on real-world performance</li>
        <li>Transparent communication about capabilities and limitations</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>AI represents one of the most transformative forces in healthcare's future. By thoughtfully addressing challenges while leveraging the technology's strengths, healthcare organizations can harness AI to improve care quality, access, and affordability while supporting rather than burdening healthcare professionals.</p>
    `,
    image: "/Images/blog/predictive-analytics.jpg",
    author: {
      name: "Dr. Jennifer Reynolds",
      avatar: "/Images/avatars/avatar-3.jpg",
      title: "Chief Medical Information Officer"
    },
    category: "Healthcare Innovation",
    tags: ["artificial intelligence", "future of healthcare", "clinical innovation", "technology trends"],
    readTime: "12 min",
    date: "July 5, 2023",
    approved: true
  }
];

// Helper to get blogs from localStorage or use defaults
export const getBlogPosts = (includeUnapproved = false): BlogPost[] => {
  if (typeof window === 'undefined') {
    return defaultBlogPosts;
  }
  
  const storedPosts = localStorage.getItem('blog_posts');
  if (!storedPosts) {
    // Initialize localStorage with default posts if empty
    localStorage.setItem('blog_posts', JSON.stringify(defaultBlogPosts));
    return defaultBlogPosts;
  }
  
  const posts = JSON.parse(storedPosts);
  
  // Filter out unapproved posts for regular users
  return includeUnapproved ? posts : posts.filter((post: BlogPost) => post.approved);
};

// Get a single blog post by ID or slug
export const getBlogPostBySlug = (slug: string, includeUnapproved = false): BlogPost | undefined => {
  const posts = getBlogPosts(includeUnapproved);
  return posts.find(post => post.id === slug);
};

// Add a new blog post
export const addBlogPost = (post: Omit<BlogPost, 'id' | 'approved'>): BlogPost => {
  const posts = getBlogPosts(true);
  
  // Generate slug/id from title
  const id = post.title
    .toLowerCase()
    .replace(/[^\w\s]/gi, '')
    .replace(/\s+/g, '-');
  
  const newPost: BlogPost = {
    ...post,
    id,
    approved: false // New posts start as unapproved
  };
  
  // Add to beginning of array (newest first)
  const updatedPosts = [newPost, ...posts];
  
  // Save to localStorage
  if (typeof window !== 'undefined') {
    localStorage.setItem('blog_posts', JSON.stringify(updatedPosts));
  }
  
  return newPost;
};

// Approve or reject a blog post
export const updatePostApproval = (postId: string, approved: boolean): BlogPost | undefined => {
  const posts = getBlogPosts(true);
  const postIndex = posts.findIndex(post => post.id === postId);
  
  if (postIndex === -1) return undefined;
  
  posts[postIndex].approved = approved;
  
  // Save to localStorage
  if (typeof window !== 'undefined') {
    localStorage.setItem('blog_posts', JSON.stringify(posts));
  }
  
  return posts[postIndex];
};

// Delete a blog post
export const deleteBlogPost = (postId: string): boolean => {
  const posts = getBlogPosts(true);
  const filteredPosts = posts.filter(post => post.id !== postId);
  
  if (filteredPosts.length === posts.length) return false; // Post not found
  
  // Save to localStorage
  if (typeof window !== 'undefined') {
    localStorage.setItem('blog_posts', JSON.stringify(filteredPosts));
  }
  
  return true;
};

// Get related posts based on category or tags
export const getRelatedPosts = (currentPostId: string, limit = 3): BlogPost[] => {
  const posts = getBlogPosts();
  const currentPost = posts.find(post => post.id === currentPostId);
  
  if (!currentPost) return [];
  
  return posts
    .filter(post => post.id !== currentPostId)
    .filter(post => 
      post.category === currentPost.category || 
      post.tags.some(tag => currentPost.tags.includes(tag))
    )
    .slice(0, limit);
}; 