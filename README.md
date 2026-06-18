# PodSnap - AI Podcast Clipper

PodSnap is an AI-powered podcast clipper that automatically transcribes audio, extracts viral moments using Gemini AI, dynamically crops widescreen videos into 9:16 vertical shorts using active speaker detection (TalkNet), and burns custom subtitles.

The project is split into a **Next.js Frontend** and a **Modal Serverless GPU Backend**.

---

## 🛠 Prerequisites

Ensure you have the following installed on your machine:
* **Node.js** (v18 or higher)
* **Python** (v3.10 or higher)
* **PostgreSQL** (running locally or hosted)
* **AWS Account** (S3 Bucket and IAM User credentials)
* **Modal Account** (Sign up at [modal.com](https://modal.com))

---

## 🚀 Setup Instructions

### 1. Database Setup
Ensure you have a PostgreSQL database running. You can set the connection string in the frontend environment variables.

---

### 2. Backend Setup (Modal Serverless)

1. Open a terminal and navigate to the backend directory:
   ```bash
   cd ai-podcast-clipper-backend
   ```

2. Authenticate the local environment with your Modal account (opens browser to log in):
   ```bash
   # Windows terminal unicode print fix (highly recommended)
   $env:PYTHONIOENCODING="utf-8"

   # Setup Modal
   python -m modal setup
   ```

3. Create the required Modal secret named `ai-podcast-clipper-secret` to supply credentials to your GPU container:
   ```bash
   modal secret create ai-podcast-clipper-secret \
     GEMINI_API_KEY="YOUR_GEMINI_API_KEY" \
     AUTH_TOKEN="123123" \
     AWS_ACCESS_KEY_ID="YOUR_AWS_ACCESS_KEY_ID" \
     AWS_SECRET_ACCESS_KEY="YOUR_AWS_SECRET_ACCESS_KEY" \
     AWS_DEFAULT_REGION="ap-south-1" \
     AWS_REGION="ap-south-1" \
     S3_BUCKET_NAME="YOUR_S3_BUCKET_NAME"
   ```

4. Deploy the backend code to Modal:
   ```bash
   python -m modal deploy main.py
   ```
   *Note: This will output a deployed production endpoint (e.g. `https://<modal-username>--ai-podcast-clipper-aipodcastclipper-f82eae.modal.run`). Save this URL.*

---

### 3. Frontend Setup (Next.js)

1. Navigate to the frontend directory:
   ```bash
   cd ../ai-podcast-clipper-frontend
   ```

2. Install the frontend dependencies:
   ```bash
   npm install
   ```

3. Configure your Environment Variables:
   Create a `.env` file in the frontend root and add the following keys:
   ```env
   # AWS S3 Configuration
   AWS_ACCESS_KEY_ID="YOUR_AWS_ACCESS_KEY_ID"
   AWS_SECRET_ACCESS_KEY="YOUR_AWS_SECRET_ACCESS_KEY"
   AWS_REGION="ap-south-1"
   S3_BUCKET_NAME="YOUR_S3_BUCKET_NAME"

   # Database URL
   DATABASE_URL="postgresql://username:password@localhost:5433/database"

   # Next-Auth Secret
   AUTH_SECRET="123123"

   # Stripe configurations (optional for local testing)
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="..."
   STRIPE_SECRET_KEY="..."
   STRIPE_WEBHOOK_SECRET="..."

   # Backend Modal Endpoint Connectors
   PROCESS_VIDEO_ENDPOINT_AUTH="123123"
   PROCESS_VIDEO_ENDPOINT="PASTE_YOUR_DEPLOYED_MODAL_URL_HERE"
   ```

4. Run Prisma database migrations to create the tables:
   ```bash
   npx prisma db push
   ```

---

## 💻 Running the Application

To run the full app locally, you need to spin up the **Next.js Web Server** and the **Inngest Dev Queue Server** in separate terminals:

### Terminal 1: Next.js Web App
```bash
cd ai-podcast-clipper-frontend
npm run dev
```
Access the application at `http://localhost:3000`.

### Terminal 2: Inngest Queue Manager
```bash
cd ai-podcast-clipper-frontend
npm run inngest-dev
```
Inspect backgrounds jobs at `http://localhost:8288`.

*(The backend runs serverless in the cloud on Modal, so there is no need to run any local terminal scripts for the backend folder once deployed!)*
