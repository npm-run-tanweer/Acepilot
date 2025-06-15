# 📘 Personalized Study Guide Generator

An AI-powered tool that generates a **custom study guide** for any topic — complete with key points, questions, flashcards, and a spaced repetition schedule to help you master anything efficiently.

---

## 🧠 Features

* 🎯 **Topic-Based Study Plan**: Enter any topic and instantly get a structured study guide.
* 📝 **Key Concepts & Explanations**: Learn what matters, simplified and organized.
* ❓ **Practice Questions**: Automatically generated questions to test your understanding.
* 🃏 **Flashcards**: Auto-generated flashcards for quick recall.
* ⏱️ **Spaced Repetition Tracker**: Schedule what to review and when using a smart memory model.
* 🧒 **“Explain Like I’m 5” Mode**: Simplifies complex topics into child-friendly language.

---

## 📌 Use Cases

* Students preparing for exams
* Professionals revising certifications
* Curious learners diving into a new subject
* Teachers creating teaching materials

---

## 🔧 Tech Stack

* **Frontend**: React + Tailwind CSS + Framer Motion
* **Backend**: Node.js + Express
* **AI/NLP**: OpenAI (GPT) or HuggingFace Transformers
* **Memory Tracking**: Custom Spaced Repetition Algorithm (based on SM-2)
* **Database**: MongoDB / PostgreSQL
* **Deployment**: Vercel (Frontend) + Render / Railway / Heroku (Backend)

---

## 📥 Input

```bash
Topic: "Operating System"
```

---

## 📤 Output

* **Key Points** – Well-structured topic breakdown
* **Practice Questions** – Multiple formats (MCQ, short answer)
* **Flashcards** – Q\&A for rapid recall
* **Review Schedule** – Optimized for long-term retention using spaced repetition

---

## 🧪 API Endpoints

* `POST /api/study-guide`

  * Body: `{ topic: "..." }`
  * Response: `{ keyPoints, questions, flashcards }`

* `POST /api/schedule`

  * Body: `{ userId, flashcardId, lastReviewed, performance }`
  * Response: `{ nextReviewDate }`

---

## 🔄 Spaced Repetition

The app uses a custom memory model inspired by **Anki’s SM-2 algorithm**, which adapts the review frequency based on your recall performance.

### Example:

| Flashcard | Last Reviewed | Performance | Next Review |
| --------- | ------------- | ----------- | ----------- |
| OS Basics | 2025-06-15    | Easy        | 2025-06-21  |

---

## 📂 Folder Structure

```
study-guide-generator/
│
├── frontend/
│   └── React app with UI & schedule view
│
├── backend/
│   └── Express server, AI logic, and SRS
│
├── database/
│   └── Mongo/Postgre models
│
├── README.md
└── .env.example
```

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/study-guide-generator.git
cd study-guide-generator
```

### 2. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🌐 Live Demo

🔗 [yourapp.vercel.app](https://yourapp.vercel.app)

---

## 🌟 Example Output

### Input:

> Topic: Data Structures

### Output:

* **Key Points:**

  * Arrays, Linked Lists, Stacks, Queues, Trees, Graphs
* **Questions:**

  * What is the time complexity of binary search?
  * Compare linked list vs array.
* **Flashcards:**

  * Q: What is a stack?
    A: A linear data structure following LIFO order.
* **Review Plan:**

  * Initial: Today
  * Next: 2 days later
  * Then: 5 days, 10 days, etc.

---

## 🧑‍💻 Contributing

Feel free to fork this repo, open issues, or contribute pull requests! We welcome improvements in logic, UI, and learning models.

---

## 🔐 Environment Variables

```env
OPENAI_API_KEY=your_openai_key
MONGODB_URI=your_mongodb_uri
```

---

## 📜 License

MIT License © 2025 Tanweer Jamal Ansari

---
