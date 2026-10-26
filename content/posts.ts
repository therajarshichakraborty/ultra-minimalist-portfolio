// Snapshot of every published Hashnode post. lib/blog.ts merges in anything newer from the RSS feeds.
export type ArchivedPost = {
  title: string;
  description: string;
  url: string;
  date: string;
  image?: string;
};

export const archive: ArchivedPost[] = [
  {
    title: "Where RAG Fails: A Practical Guide to Building and Breaking Retrieval-Augmented Generation with JavaScript",
    description:
      "Ask a large language model a question about your company's internal policy document, and it will confidently make something up. Not because it is broken…",
    url: "https://the-debug-monk.hashnode.dev/where-rag-fails-a-practical-guide-to-building-and-breaking-retrieval-augmented-generation-with-javascript",
    date: "2026-07-19T17:35:43.000Z",
    image: "https://cdn.hashnode.com/uploads/covers/691ca9e73c217d856be2e84a/55ece882-37f1-47af-b914-d81b75f95c66.png",
  },
  {
    title: "How LLMs Understands Your Questions: A Beginner-Friendly Guide to LLMs, Tokens, and Transformers",
    description:
      "Have you ever wondered how ChatGPT, Gemini , Claude etc LLMs can answer your questions in seconds, write code, explain difficult concepts in simple words…",
    url: "https://the-debug-monk.hashnode.dev/how-llms-understands-your-questions-a-beginner-friendly-guide-to-llms-tokens-and-transformers",
    date: "2026-07-01T18:19:36.000Z",
    image: "https://cdn.hashnode.com/uploads/covers/691ca9e73c217d856be2e84a/ffdabfb6-3d07-41c6-9ddb-62cc42fa6bfa.png",
  },
  {
    title: "Blocking vs Non-Blocking Code in Node.js",
    description:
      "When learning Node.js, one of the most important concepts to understand is: Blocking vs Non-Blocking Code This concept is the reason why Node.js can handle…",
    url: "https://webdev-cohort-2026.hashnode.dev/blocking-vs-non-blocking-code-in-node-js",
    date: "2026-05-10T13:05:48.000Z",
    image: "https://cdn.hashnode.com/uploads/covers/691ca9e73c217d856be2e84a/9146288d-36e5-411f-9068-6c187cfb95b5.png",
  },
  {
    title: "What is Middleware in Express and How It Works",
    description:
      "When building backend applications with Express.js, one of the most important concepts you will encounter is middleware. Middleware is the backbone of…",
    url: "https://webdev-cohort-2026.hashnode.dev/what-is-middleware-in-express-and-how-it-works",
    date: "2026-05-10T12:55:48.000Z",
    image: "https://cdn.hashnode.com/uploads/covers/691ca9e73c217d856be2e84a/b6662bfa-5824-43e8-bf7c-d0db9e191fa0.png",
  },
  {
    title: "How Node.js Handles Multiple Requests with a Single Thread",
    description:
      "Modern backend systems need to handle thousands of users at the same time. Traditional servers usually create one thread per request, but Node.js works…",
    url: "https://webdev-cohort-2026.hashnode.dev/how-node-js-handles-multiple-requests-with-a-single-thread",
    date: "2026-05-10T12:24:17.000Z",
    image: "https://cdn.hashnode.com/uploads/covers/691ca9e73c217d856be2e84a/83a5b716-cf5a-44a2-8917-c8ebc6fdc5ed.png",
  },
  {
    title: "URL Parameters vs Query Strings in Express.js",
    description:
      "Every backend engineer eventually works with URLs like: or Both look similar. But internally they solve completely different problems. This article…",
    url: "https://webdev-cohort-2026.hashnode.dev/url-parameters-vs-query-strings-in-express-js",
    date: "2026-05-10T12:00:40.000Z",
    image: "https://cdn.hashnode.com/uploads/covers/691ca9e73c217d856be2e84a/7fed0a44-2d54-4546-ac02-5156fc9f4cac.png",
  },
  {
    title: "Storing Uploaded Files and Serving Them in Express",
    description:
      "Uploading files is only half of the problem. The real backend engineering starts after the upload: Where should files be stored? How are files accessed…",
    url: "https://webdev-cohort-2026.hashnode.dev/storing-uploaded-files-and-serving-them-in-express",
    date: "2026-05-10T11:52:09.000Z",
    image: "https://cdn.hashnode.com/uploads/covers/691ca9e73c217d856be2e84a/32d3e936-6712-4aab-9b2c-001a0095e3d1.png",
  },
  {
    title: "Handling File Uploads in Express with Multer",
    description:
      "Every real-world backend eventually needs file uploads: Profile pictures PDFs Resume uploads Product images Assignment submissions But Express cannot…",
    url: "https://webdev-cohort-2026.hashnode.dev/handling-file-uploads-in-express-with-multer",
    date: "2026-05-10T11:37:46.000Z",
    image: "https://cdn.hashnode.com/uploads/covers/691ca9e73c217d856be2e84a/02845e9b-4c71-4465-9621-3753b7535833.png",
  },
  {
    title: "Creating Routes and Handling Requests with Express",
    description:
      "Express.js is a minimal and fast backend framework built on top of Node.js. It simplifies server creation, routing, middleware handling, APIs, and HTTP…",
    url: "https://webdev-cohort-2026.hashnode.dev/creating-routes-and-handling-requests-with-express",
    date: "2026-05-10T11:30:13.000Z",
    image: "https://cdn.hashnode.com/uploads/covers/691ca9e73c217d856be2e84a/287375ee-e4b5-4255-a4a5-334e15006e13.png",
  },
  {
    title: "Setting Up Your First Node.js Application Step-by-Step",
    description:
      "Node.js lets you run JavaScript outside the browser. It is built on Chrome’s V8 engine and is widely used for backend development, APIs, real-time apps…",
    url: "https://webdev-cohort-2026.hashnode.dev/setting-up-your-first-node-js-application-step-by-step",
    date: "2026-05-10T11:22:37.000Z",
    image: "https://cdn.hashnode.com/uploads/covers/691ca9e73c217d856be2e84a/d2cb4034-4d8e-4a5e-820e-62ad9808e887.png",
  },
  {
    title: "The Node.js Event Loop Explained",
    description:
      "Node.js can handle thousands of requests using a single thread. But how? The answer is: The event loop is the core mechanism that makes Node.js…",
    url: "https://webdev-cohort-2026.hashnode.dev/the-node-js-event-loop-explained",
    date: "2026-05-10T11:14:23.000Z",
    image: "https://cdn.hashnode.com/uploads/covers/691ca9e73c217d856be2e84a/083ee8b2-d979-4c59-bfa0-16fb35cb8606.png",
  },
  {
    title: "REST API Design Made Simple with Express.js",
    description:
      "Modern web applications constantly exchange data between clients and servers. Whenever you log into an app, fetch products from an e-commerce site, or…",
    url: "https://webdev-cohort-2026.hashnode.dev/rest-api-design-made-simple-with-express-js",
    date: "2026-05-10T10:54:23.000Z",
    image: "https://cdn.hashnode.com/uploads/covers/691ca9e73c217d856be2e84a/4b4122a6-1878-4117-b71b-1ef2c00d6417.png",
  },
  {
    title: "Why Node.js is Perfect for Building Fast Web Applications",
    description:
      "Modern web applications are expected to be incredibly fast. Users do not lie waiting for: Pages to load APIs to respond Messages to send Videos to stream…",
    url: "https://webdev-cohort-2026.hashnode.dev/why-node-js-is-perfect-for-building-fast-web-applications",
    date: "2026-05-10T10:39:35.000Z",
    image: "https://cdn.hashnode.com/uploads/covers/691ca9e73c217d856be2e84a/8897291d-6813-4414-b01d-ce6047aae96d.png",
  },
  {
    title: "What is Node.js? JavaScript on the Server Explained",
    description:
      "There was a time when JavaScript had only one job - making websites interactive inside the browser. Animations, button clicks, form validations, popups…",
    url: "https://webdev-cohort-2026.hashnode.dev/what-is-node-js-javascript-on-the-server-explained",
    date: "2026-05-10T10:29:35.000Z",
    image: "https://cdn.hashnode.com/uploads/covers/691ca9e73c217d856be2e84a/8fa55187-0682-4924-bc9a-52cabf8dfba9.png",
  },
  {
    title: "Understanding the this Keyword in JavaScript",
    description:
      "JavaScript’s this keyword confuses almost every developer at some point. You write a function. You call it. And suddenly this points somewhere completely…",
    url: "https://webdev-cohort-2026.hashnode.dev/understanding-the-this-keyword-in-javascript",
    date: "2026-05-10T08:07:29.000Z",
    image: "https://cdn.hashnode.com/uploads/covers/691ca9e73c217d856be2e84a/24b01987-f452-43b3-9bf7-54e34d8fb1b3.webp",
  },
  {
    title: "Map and Set in JavaScript: The Ultimate Guide Every Developer Should Know",
    description:
      "JavaScript gives developers multiple ways to store and manage data. Most beginners start with Objects and Arrays, but as applications grow larger and more…",
    url: "https://webdev-cohort-2026.hashnode.dev/map-and-set-in-javascript-the-ultimate-guide-every-developer-should-know",
    date: "2026-05-10T07:48:13.000Z",
    image: "https://cdn.hashnode.com/uploads/covers/691ca9e73c217d856be2e84a/9c010674-4637-4920-8300-71b2f5dafd62.jpg",
  },
  {
    title: "Destructuring in JavaScript",
    description:
      "Modern JavaScript is designed to make code cleaner, shorter, and easier to read. One feature that completely changed how developers work with arrays and…",
    url: "https://webdev-cohort-2026.hashnode.dev/destructuring-in-javascript",
    date: "2026-05-10T07:38:40.000Z",
    image: "https://cdn.hashnode.com/uploads/covers/691ca9e73c217d856be2e84a/e4794f84-d92a-472c-a507-d58631cbfb6e.jpg",
  },
  {
    title: "Synchronous vs Asynchronous JavaScript",
    description:
      "JavaScript looks simple when we first learn it. You write one line, then the next line runs, and then the next. But modern applications are very different.",
    url: "https://webdev-cohort-2026.hashnode.dev/synchronous-vs-asynchronous-javascript",
    date: "2026-05-10T07:30:59.000Z",
    image: "https://cdn.hashnode.com/uploads/covers/691ca9e73c217d856be2e84a/05a54a7a-08b3-4646-8274-e2fa4b9c81db.jpg",
  },
  {
    title: "JavaScript Promises Explained for Beginners",
    description:
      "JavaScript is single-threaded, but modern applications still perform multiple tasks at the same time - fetching APIs, reading files, handling payments…",
    url: "https://webdev-cohort-2026.hashnode.dev/javascript-promises-explained-for-beginners",
    date: "2026-05-10T07:22:23.000Z",
    image: "https://cdn.hashnode.com/uploads/covers/691ca9e73c217d856be2e84a/3ad3cd4b-d2bd-468f-a0c9-abce9d80495d.png",
  },
  {
    title: "Async/Await in JavaScript: Writing Cleaner Asynchronous Code",
    description:
      "JavaScript was designed as a single-threaded language, but modern applications constantly deal with asynchronous operations like API calls, database…",
    url: "https://webdev-cohort-2026.hashnode.dev/async-await-in-javascript-writing-cleaner-asynchronous-code",
    date: "2026-05-10T07:10:18.000Z",
    image: "https://cdn.hashnode.com/uploads/covers/691ca9e73c217d856be2e84a/ce99b955-3602-43fa-8e91-3220d9ecdffe.png",
  },
  {
    title: "Error Handling in JavaScript: Try, Catch, Finally",
    description:
      "Modern JavaScript applications power everything from banking systems to social media platforms. But no matter how carefully software is written, errors are…",
    url: "https://webdev-cohort-2026.hashnode.dev/error-handling-in-javascript-try-catch-finally",
    date: "2026-05-10T06:47:14.000Z",
    image: "https://cdn.hashnode.com/uploads/covers/691ca9e73c217d856be2e84a/44dc9548-6bcc-4245-919e-c8edc48622db.png",
  },
  {
    title: "Spread vs Rest Operators in JavaScript",
    description:
      "JavaScript introduced the ... syntax in ES6, and it quickly became one of the most frequently used modern language features. At first glance, the spread…",
    url: "https://webdev-cohort-2026.hashnode.dev/spread-vs-rest-operators-in-javascript",
    date: "2026-05-10T06:21:41.000Z",
    image: "https://cdn.hashnode.com/uploads/covers/691ca9e73c217d856be2e84a/542af36a-d95b-4692-ace7-cd73679c3115.png",
  },
  {
    title: "String Polyfills and Common Interview Methods in JavaScript",
    description:
      "Modern JavaScript provides a lot of string manipulation methods right out of the box. With just a couple of lines of code, we can easily: reverse a string,",
    url: "https://webdev-cohort-2026.hashnode.dev/string-polyfills-and-common-interview-methods-in-javascript",
    date: "2026-05-10T06:09:56.458Z",
    image: "https://cdn.hashnode.com/uploads/covers/691ca9e73c217d856be2e84a/51ce819e-86b7-4960-86f8-b3cfdb6618f8.png",
  },
  {
    title: "Understanding the new keyword in JavaScript",
    description:
      "JavaScript might feel easy initially. You declare variables, write some functions and gradually create applications. But when you start working with…",
    url: "https://webdev-cohort-2026.hashnode.dev/understanding-the-new-keyword-in-javascript",
    date: "2026-05-10T05:40:01.922Z",
    image: "https://cdn.hashnode.com/uploads/covers/691ca9e73c217d856be2e84a/2ac3f7a3-ac93-45be-8912-e6bfb3238f4f.png",
  },
  {
    title: "Callbacks in JavaScript: Why They Exist",
    description:
      "The language JavaScript seems to be straightforward until you begin to learn it. You write the function, execute it, obtain the output, and move further…",
    url: "https://webdev-cohort-2026.hashnode.dev/callbacks-in-javascript-why-they-exist",
    date: "2026-05-10T05:28:11.556Z",
    image: "https://cdn.hashnode.com/uploads/covers/691ca9e73c217d856be2e84a/de957232-d68a-4da2-9fdc-31794793d8f4.png",
  },
  {
    title: "Sessions vs JWT vs Cookies: Authentication Explained!",
    description:
      "Learn how to choose an appropriate authentication approach for your project. You've probably had a case where you opened a webpage and saw that you're…",
    url: "https://webdev-cohort-2026.hashnode.dev/sessions-vs-jwt-vs-cookies-authentication-explained",
    date: "2026-05-09T19:21:38.333Z",
    image: "https://cdn.hashnode.com/uploads/covers/691ca9e73c217d856be2e84a/5c18233f-9570-4d8b-a22e-faceaf907ac8.png",
  },
  {
    title: "Template Literals in JavaScript: Write Cleaner, Smarter, and Modern Strings",
    description:
      "JavaScript development has evolved significantly over the years, and one of the most impactful features introduced in ES6 (ECMAScript 2015) is Template…",
    url: "https://webdev-cohort-2026.hashnode.dev/template-literals-in-javascript-write-cleaner-smarter-and-modern-strings",
    date: "2026-05-09T14:38:12.377Z",
    image: "https://cdn.hashnode.com/uploads/covers/691ca9e73c217d856be2e84a/0324022a-8e6e-45f2-a998-22a6aea92ab9.png",
  },
  {
    title: "JavaScript Modules Explained",
    description:
      "Imagine you are a developer and building a large JavaScript application using only one file. At first, everything feels manageable. You create a few…",
    url: "https://webdev-cohort-2026.hashnode.dev/javascript-modules-import-and-export-explained",
    date: "2026-05-09T12:31:47.282Z",
    image: "https://cdn.hashnode.com/uploads/covers/691ca9e73c217d856be2e84a/37aed1e8-3b12-45e7-b242-3f5021c70faa.png",
  },
  {
    title: "Async Code in Node.js Explained: Callbacks, Promises, Event Loop & Async/Await",
    description:
      "Learn how asynchronous programming works in Node.js with real-world examples. Understand callbacks, promises, callback hell, the event loop, non-blocking…",
    url: "https://webdev-cohort-2026.hashnode.dev/async-code-in-node-js-callbacks-and-promises",
    date: "2026-05-09T12:05:19.314Z",
    image: "https://cdn.hashnode.com/uploads/covers/691ca9e73c217d856be2e84a/27b5d73e-fa57-4f48-b23c-b7f4c8febcc2.png",
  },
  {
    title: "Linux File System",
    description:
      "I didn’t start this investigation as a Linux user. I started it as a Windows loyalist. It was a random evening. Someone said: “Linux is better than…",
    url: "https://webdev-cohort-2026.hashnode.dev/case-file-the-day-i-fought-for-windows-and-linux-won",
    date: "2026-04-22T10:29:45.640Z",
    image:
      "https://cdn.hashnode.com/uploads/og-images/691ca9e73c217d856be2e84a/067a5ea2-2516-436b-9125-1936cc89428b.jpg",
  },
  {
    title: "JavaScript Operators: The Basics You Need to Know",
    description:
      "Programming is essentially about performing operations on data. Whether we are building a simple calculator, validating user input, or creating complex web…",
    url: "https://webdev-cohort-2026.hashnode.dev/javascript-operators-the-basics-you-need-to-know",
    date: "2026-03-15T16:43:59.381Z",
    image:
      "https://webdev-cohort-2026.hashnode.dev/api/og/post?og=eyJhdXRob3IiOiJSYWphcnNoaSUyMENoYWtyYWJvcnR5IiwiaXNEZWZhdWx0TW9kZURhcmsiOmZhbHNlLCJyZWFkVGltZSI6NywiY29tbWVudHMiOjAsInJlYWN0aW9ucyI6MCwiZG9tYWluIjoid2ViZGV2LWNvaG9ydC0yMDI2Lmhhc2hub2RlLmRldiIsInRpdGxlIjoiSmF2YVNjcmlwdCUyME9wZXJhdG9ycyUzQSUyMFRoZSUyMEJhc2ljcyUyMFlvdSUyME5lZWQlMjB0byUyMEtub3ciLCJwaG90byI6Imh0dHBzOi8vY2RuLmhhc2hub2RlLmNvbS9yZXMvaGFzaG5vZGUvaW1hZ2UvdXBsb2FkL3YxNzcwMDEyMzI4MDM4LzIxODYzODQxLTg0OTctNDE3NS04MGVmLWUwNzk1YmI2NTU4Ni5qcGVnP3c9NTAwJmg9NTAwJmZpdD1jcm9wJmNyb3A9ZW50cm9weSZhdXRvPWNvbXByZXNzLGZvcm1hdCZmb3JtYXQ9d2VicCIsImxvZ28iOm51bGwsImZhdmljb24iOm51bGwsInB1Ymxpc2hlZEF0IjoiMjAyNi0wMy0xNVQxNjo0Mzo1OS4zODFaIiwidXBkYXRlZEF0IjoiMjAyNi0wMy0xNVQxNjo0Mzo1OS4zODFaIiwiYmxvZ05hbWUiOiJXZWJEZXYlMjBDb2hvcnQlMjAyMDI2In0=",
  },
  {
    title: "The Magic of this, call(), apply(), and bind() in JavaScript",
    description:
      "JavaScript is a powerful language that allows developers to write flexible and reusable code. As applications grow more complex, developers often need to…",
    url: "https://webdev-cohort-2026.hashnode.dev/the-magic-of-this-call-apply-and-bind-in-javascript",
    date: "2026-03-15T14:10:54.668Z",
    image: "https://cdn.hashnode.com/uploads/covers/691ca9e73c217d856be2e84a/f405f98a-19e7-4887-93fc-4ca377dc5d9c.webp",
  },
  {
    title: "Function Declaration vs Function Expression: What’s the Difference?",
    description:
      "Functions are one of the most fundamental building blocks in JavaScript. Almost every program, whether small or large, uses functions to organize logic and…",
    url: "https://webdev-cohort-2026.hashnode.dev/function-declaration-vs-function-expression-what-s-the-difference",
    date: "2026-03-15T14:04:25.268Z",
    image: "https://cdn.hashnode.com/uploads/covers/691ca9e73c217d856be2e84a/99658ce0-f5cb-47bb-b305-d61adbacfa86.png",
  },
  {
    title: "JavaScript Arrays 101",
    description:
      "Almost every modern software application works with collections of data. For example: A music app stores a list of songs A shopping website stores a list…",
    url: "https://webdev-cohort-2026.hashnode.dev/javascript-arrays-101",
    date: "2026-03-15T13:55:33.136Z",
    image: "https://cdn.hashnode.com/uploads/covers/691ca9e73c217d856be2e84a/84a3fd6c-4f1e-4180-a6a2-6f6b2e5748d8.jpg",
  },
  {
    title: "Understanding Object-Oriented Programming in JavaScript",
    description:
      "As applications grow larger, managing code becomes increasingly complex. Developers need a structured way to organize logic, reuse functionality, and…",
    url: "https://webdev-cohort-2026.hashnode.dev/understanding-object-oriented-programming-in-javascript",
    date: "2026-03-15T13:47:28.733Z",
    image: "https://cdn.hashnode.com/uploads/covers/691ca9e73c217d856be2e84a/8e605c9f-01bf-465b-ab15-d7a5d69c3e1d.png",
  },
  {
    title: "Understanding Objects in JavaScript",
    description:
      "Modern JavaScript applications deal with structured data. While variables can store individual values like a name or age, real-world applications often…",
    url: "https://webdev-cohort-2026.hashnode.dev/understanding-objects-in-javascript",
    date: "2026-03-15T13:27:16.830Z",
    image: "https://cdn.hashnode.com/uploads/covers/691ca9e73c217d856be2e84a/db853c76-1601-44d5-a52d-6ec3ed83f279.jpg",
  },
  {
    title: "Understanding Variables and Data Types in JavaScript",
    description:
      "Every programming language begins with a simple idea: storing information. Whether you're building a web application, writing a script, or developing a…",
    url: "https://webdev-cohort-2026.hashnode.dev/understanding-variables-and-data-types-in-javascript",
    date: "2026-03-15T13:16:21.090Z",
    image: "https://cdn.hashnode.com/uploads/covers/691ca9e73c217d856be2e84a/83442e9e-fdb3-458e-a2ec-9fbe344e8c59.jpg",
  },
  {
    title: "Control Flow in JavaScript - If, Else, and Switch Explained",
    description:
      "One evening in Baburao’s rented house, chaos was normal as always. Raju (Akshay Kumar) - always looking for shortcuts Shyam (Suniel Shetty) - logical…",
    url: "https://webdev-cohort-2026.hashnode.dev/control-flow-in-javascript-if-else-and-switch-explained",
    date: "2026-03-15T13:07:13.110Z",
    image: "https://cdn.hashnode.com/uploads/covers/691ca9e73c217d856be2e84a/336dad55-7067-467e-a3b8-9e906f473e91.jpg",
  },
  {
    title: "Arrow Functions in JavaScript - A Simpler Way to Write Functions",
    description:
      "It was 11:47 PM in the engineering hostel. Four friends were sitting on the floor with laptops open, Maggi bowls empty, and the WiFi barely surviving…",
    url: "https://webdev-cohort-2026.hashnode.dev/arrow-functions-in-javascript-a-simpler-way-to-write-functions",
    date: "2026-03-15T12:57:01.480Z",
    image: "https://cdn.hashnode.com/uploads/covers/691ca9e73c217d856be2e84a/a01c2520-4ef5-4948-8de3-8390b03106e0.webp",
  },
  {
    title:
      "☕ I Explained JavaScript Array Methods to My Hostel Friends While Drinking Liquor Black Tea - And It Became a Love Story",
    description: "JavaScript Array Methods Explained Through My One-Sided Host",
    url: "https://webdev-cohort-2026.hashnode.dev/i-explained-javascript-array-methods-to-my-hostel-friends-while-drinking-liquor-black-tea-and-it-became-a-love-story",
    date: "2026-03-15T12:34:56.331Z",
    image: "https://cdn.hashnode.com/uploads/covers/691ca9e73c217d856be2e84a/8202e9eb-df70-440f-b2ab-15735b61a7ec.webp",
  },
  {
    title: "JavaScript Promises Explained for Beginners with Real-Life E",
    description:
      "She said: “I’ll call you later.”JavaScript said: “Same Hare.” This is not a tutorial.This is a complete story about love, trust, waiting, disappointment……",
    url: "https://webdev-cohort-2026.hashnode.dev/she-said-i-ll-text-you-tonight-javascript-promises-explained-through-a-one-sided-love-story-that-finally-gets-closure",
    date: "2026-03-01T10:41:59.838Z",
    image: "https://cdn.hashnode.com/uploads/covers/691ca9e73c217d856be2e84a/f0476337-4179-4bb4-a44f-138fac15fae6.jpg",
  },
  {
    title: "Emmet for HTML: A Beginner’s Guide to Writing Faster Markup",
    description:
      "Learn Emmet from scratch and write HTML faster using simple shortcuts. Create elements, add classes, nest tags, repeat elements, and generate boilerplate.",
    url: "https://webdev-cohort-2026.hashnode.dev/emmet-for-html",
    date: "2026-01-30T05:55:39.375Z",
    image:
      "https://cdn.hashnode.com/res/hashnode/image/upload/v1769752480563/adfc778a-ada9-4bbe-9870-6ebe25c127c0.jpeg",
  },
  {
    title: "CSS Selectors 101",
    description:
      "New to CSS? This guide explains CSS selectors, including element, class, ID, and descendant selectors, in a simple, beginner-friendly way.",
    url: "https://webdev-cohort-2026.hashnode.dev/css-selectors-101",
    date: "2026-01-30T05:47:22.160Z",
    image:
      "https://cdn.hashnode.com/res/hashnode/image/upload/v1769751943456/419e3ac2-442c-4290-8973-de0e98b9286b.jpeg",
  },
  {
    title: "Understanding HTML Tags and Elements – A Beginner-Friendly Guide",
    description:
      "Learn what HTML tags and elements are, how opening and closing tags work, block vs inline elements, and the basics of HTML structure.",
    url: "https://webdev-cohort-2026.hashnode.dev/understanding-html-tags-and-elements",
    date: "2026-01-30T05:40:39.161Z",
    image: "https://cdn.hashnode.com/res/hashnode/image/upload/v1769751579507/72d27c69-e664-4d9f-a01a-ef5624b54f8c.png",
  },
  {
    title: "How a Browser Works",
    description:
      "Ever wondered what happens after you type a URL? Learn how a browser works—from HTML parsing to DOM, CSSOM, rendering, and pixels on screen.",
    url: "https://webdev-cohort-2026.hashnode.dev/how-a-browser-works",
    date: "2026-01-30T05:31:51.389Z",
    image:
      "https://cdn.hashnode.com/res/hashnode/image/upload/v1769751012248/afae598c-2dcb-40d6-ade5-dcdf43eb79e3.webp",
  },
  {
    title: "TCP Working: 3-Way Handshake & Reliable Communication",
    description:
      "Learn TCP from scratch: why it’s needed, how the 3-way handshake works, how data is transferred reliably, and how TCP connections close.",
    url: "https://webdev-cohort-2026.hashnode.dev/tcp-working-3-way-handshake-and-reliable-communication",
    date: "2026-01-30T05:17:34.884Z",
    image:
      "https://cdn.hashnode.com/res/hashnode/image/upload/v1769750155874/63c506c0-743e-4172-9c14-720c6c46df16.webp",
  },
  {
    title: "TCP vs UDP Explained: When to Use What and How HTTP Relates",
    description:
      "Understand TCP vs UDP in simple terms. Learn when to use each protocol, real-world examples, and how HTTP runs on top of TCP in modern networks.",
    url: "https://webdev-cohort-2026.hashnode.dev/tcp-vs-udp-when-to-use-what-and-how-tcp-relates-to-http",
    date: "2026-01-30T03:48:51.129Z",
    image:
      "https://cdn.hashnode.com/res/hashnode/image/upload/v1769744867833/88c19c34-3e07-40d7-972c-eaf666aea6b3.webp",
  },
  {
    title: "Understanding Network Devices: How the Internet Reaches Your Screen",
    description:
      "Learn how network devices work together-from modem and router to switch, firewall, and load balancer-using simple analogies and real-world system…",
    url: "https://git-for-all.hashnode.dev/understanding-network-devices-how-the-internet-reaches-your-screen",
    date: "2026-01-30T03:35:20.000Z",
    image:
      "https://cdn.hashnode.com/res/hashnode/image/upload/v1769744226790/7815f918-79cd-47e0-9257-cffa7336f862.jpeg",
  },
  {
    title: "Getting Started with cURL: How to Talk to Servers from the Terminal",
    description:
      "Learn cURL from scratch. Understand how to send requests, receive responses, and talk to APIs using simple terminal commands. Beginner-friendly guide.",
    url: "https://webdev-cohort-2026.hashnode.dev/getting-started-with-curl-talking-to-servers-without-fear",
    date: "2026-01-30T03:25:20.098Z",
    image: "https://cdn.hashnode.com/res/hashnode/image/upload/v1769743459745/c2372068-f2a4-4dfa-ab99-200b55e97df6.png",
  },
  {
    title: "How DNS Resolution Works: Root, TLD & Authoritative Servers Explained",
    description:
      "Understand how DNS resolution works step by step. Learn root, TLD, and authoritative servers using dig commands in a simple, system-design friendly guide.",
    url: "https://webdev-cohort-2026.hashnode.dev/how-dns-resolution-works-a-story-of-how-the-internet-finds-websites",
    date: "2026-01-30T03:11:01.360Z",
    image: "https://cdn.hashnode.com/res/hashnode/image/upload/v1769742587072/4c483096-32de-43a8-a720-73f99a0996a4.png",
  },
  {
    title: "DNS Record Types Explained: A, AAAA, CNAME, MX, NS & TXT",
    description:
      "Learn DNS record types in simple terms. Understand A, AAAA, CNAME, MX, NS, and TXT records with real examples and diagrams. Beginner-friendly guide.",
    url: "https://webdev-cohort-2026.hashnode.dev/dns-record-types-explained",
    date: "2026-01-29T23:11:23.660Z",
    image: "https://cdn.hashnode.com/res/hashnode/image/upload/v1769728097570/200e492a-9672-476b-be91-477e8fe12742.png",
  },
  {
    title: "Why Version Control Exists: The Pendrive Problem",
    description:
      "A beginner-friendly explanation of the pendrive problem and why version control systems became essential for modern software development.",
    url: "https://git-for-all.hashnode.dev/why-version-control-exists-the-pendrive-problem",
    date: "2026-01-17T14:21:24.000Z",
    image:
      "https://cdn.hashnode.com/res/hashnode/image/upload/v1768659607392/6f81edc1-7d9f-4cc5-961b-d958a2b4abb7.webp",
  },
  {
    title: "Inside Git: How It Works and the Role of the .git Folder",
    description:
      "Learn how Git works internally, understand the .git folder, Git objects like blob, tree, and commit, and build a clear mental model of Git internals.",
    url: "https://git-for-all.hashnode.dev/inside-git-how-it-works-and-the-role-of-the-git-folder",
    date: "2026-01-17T14:11:03.000Z",
    image: "https://cdn.hashnode.com/res/hashnode/image/upload/v1768658972567/c06d5486-1b35-496c-b061-b927c16c789d.png",
  },
  {
    title: "Git for Beginners: Basics and Essential Commands",
    description:
      "There’s a moment every developer remembers. You change “just one line,” everything breaks, and suddenly you’re wondering: What did I touch? Can I go back?…",
    url: "https://git-for-all.hashnode.dev/git-for-beginners-basics-and-essential-commands",
    date: "2026-01-17T13:50:46.000Z",
    image:
      "https://cdn.hashnode.com/res/hashnode/image/upload/v1768657355599/5a8134cf-0d9b-4153-b72f-1555af4d34c0.jpeg",
  },
];
