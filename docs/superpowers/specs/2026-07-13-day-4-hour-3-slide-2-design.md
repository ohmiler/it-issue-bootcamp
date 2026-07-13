# Day 4 Hour 3 Slide 2 Design

## Goal

Replace the diagram-like comparison on Slide 2 with short Thai prose that students can read naturally.

## Content Structure

Slide 2 keeps its current title and uses three short parts:

1. `ตอน Day 3` explains that submitting the form only updated mock data in client-side state, so the data disappeared after a refresh.
2. `ตอน Day 4` explains that submitting the form will call a Server Action, validate the input, save it to Supabase, and then navigate to the appropriate page.
3. A final sentence explains that important create logic moves to the server when data must be stored permanently.

## Presentation

- Remove both fenced flow blocks and arrow notation.
- Use plain Thai paragraphs with familiar terms.
- Keep each paragraph to two sentences or fewer.
- Do not introduce implementation details that belong to later slides.

## Verification

- Slide 2 renders without code blocks.
- The transition from Day 3 mock state to Day 4 persistent storage remains clear.
- Content verification and the production build pass.
