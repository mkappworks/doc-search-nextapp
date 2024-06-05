# DocSearch

Nextjs application capable of uploading files and notes to convex file storage scoped to a org using clerk. There is a vector searching functionality using the openai embedding and convex vector search where users can search for relevant docs/notes from their org.

## Technologies Used

- Javascript framework: Nextjs
- Database: Convex
- Auth: Clerk
- Component Library: Shadcn
- Embedding generation: OpenAI

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository: `git clone git@github.com:mkappworks/doc-search-nextapp.git`
2. Install dependencies: `pnpm install`
3. Set up environment variables:

   - Create a `.env` file in the root directory of the project.
   - Add the required environment variables to the `.env` file. For example:

     ```
     CONVEX_DEPLOYMENT=
     NEXT_PUBLIC_CONVEX_URL=
     NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
     CLERK_SECRET_KEY=
     ```

   - Save the `.env` file.

4. Start the application: `pnpm dev`
5. Open your browser and navigate to `http://localhost:3000` to view the application.

## Working with Convex used by

1. Run `npx convex dev` to sync up local changes during development to the convex deployment at [Convex](www.convex.dev)

## Contributing

Contributions are welcome! To contribute to this project, follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Submit a pull request
