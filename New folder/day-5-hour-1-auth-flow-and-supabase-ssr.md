# Day 5 - ชั่วโมงที่ 1: Authentication Flow and Supabase SSR Setup

## เป้าหมายของชั่วโมงนี้

หลังจบชั่วโมงแรกของ Day 5 ผู้เรียนควรสามารถ:

1. อธิบายความต่างระหว่าง authentication และ authorization ได้
2. เข้าใจ login/session/cookie/JWT ในระดับ workflow
3. เข้าใจว่าทำไม Next.js App Router ต้องใช้ cookie-based auth สำหรับ SSR
4. ติดตั้งและตั้งค่า `@supabase/ssr` ได้
5. สร้าง Supabase browser client และ server client ได้
6. เพิ่ม proxy สำหรับ refresh auth session ได้
7. เข้าใจว่า Day 5 จะเปลี่ยนระบบจาก demo-public CRUD เป็น authenticated CRUD

## ไฟล์ที่ใช้ในชั่วโมงนี้

ติดตั้ง package ที่ project root

สร้างหรือแก้ไฟล์:

```text
src/lib/supabase/client.ts
src/lib/supabase/server.ts
src/lib/supabase/proxy.ts
proxy.ts
.env.local
.env.example
```

---

# โครงสร้างเวลา 60 นาที

| เวลา | หัวข้อ | รูปแบบ |
|---|---|---|
| 0-10 นาที | Recap Day 4 และปัญหา demo policy | Explain |
| 10-25 นาที | Authentication flow | Diagram |
| 25-35 นาที | Supabase SSR Auth setup | Live coding |
| 35-50 นาที | สร้าง browser/server client และ proxy | Live coding |
| 50-60 นาที | Recap และตรวจรายการสำคัญ | สรุป |

---

# Slide 1: Recap จาก Day 4

## Day 4 เราทำอะไรได้แล้ว

- CRUD กับ Supabase database
- Server Actions สำหรับ create และ update status
- Deploy ไป Vercel
- มี production URL

## แต่ยังมีปัญหาใหญ่

Day 4 ใช้ demo policy:

```text
anon can select/insert/update
```

## ทำไมไม่ปลอดภัย

ใครก็ตามที่เรียก API ได้ อาจอ่านหรือแก้ข้อมูลได้

## Key Message

Day 5 คือวันที่เราทำให้ระบบรู้ว่า “ใครคือผู้ใช้” และ “ผู้ใช้นี้มีสิทธิ์ทำอะไร”

---

# Slide 2: Authentication vs Authorization

## Authentication

การตรวจสอบว่า user คือใคร

ตัวอย่าง:

```text
Login ด้วย email/password
```

## Authorization

การตรวจสอบว่า user มีสิทธิ์ทำอะไร

ตัวอย่าง:

```text
USER สร้าง issue ได้
ADMIN เปลี่ยน status ได้
```

## Key Message

Login สำเร็จไม่ได้แปลว่าทำได้ทุกอย่าง ต้องมี authorization ต่อเสมอ

---

# Slide 3: Auth Flow แบบภาพรวม

```text
User
  |
  v
Login Page
  |
  v
Supabase Auth
  |
  v
Session Cookie
  |
  v
Next.js Server Component / Server Action
  |
  v
RLS Policy
  |
  v
Database
```

## Key Message

Auth ไม่ได้อยู่แค่หน้า login แต่เกี่ยวข้องกับ server action และ database policy ด้วย

---

# Slide 4: Session คืออะไร

## Session

ข้อมูลที่บอกว่าผู้ใช้ login แล้ว

ใน Supabase Auth จะเกี่ยวข้องกับ:

- access token
- refresh token
- cookie สำหรับ SSR
- user id
- email

## ทำไมต้อง cookie

เพราะ Server Component และ Server Action ต้องรู้ว่า request นี้มาจาก user คนไหน

---

# Slide 5: ทำไมต้องใช้ `@supabase/ssr`

## ปัญหา

ถ้าเก็บ session เฉพาะใน localStorage ฝั่ง browser:

```text
Server Component อ่าน session ไม่ได้
Server Action ไม่รู้ว่า user เป็นใคร
RLS ใช้ auth.uid() ไม่ได้ตามที่คาด
```

## `@supabase/ssr` ช่วยอะไร

- เก็บ session ใน cookies
- สร้าง browser client
- สร้าง server client
- refresh session ผ่าน proxy

## Key Message

ถ้าใช้ Next.js App Router + Supabase Auth ควรตั้งค่า SSR auth ให้ถูกตั้งแต่ต้น

---

# Slide 6: ติดตั้ง Package

## Run in terminal at project root

```bash
npm install @supabase/supabase-js @supabase/ssr
```

## หมายเหตุ

Day 4 อาจติดตั้ง `@supabase/supabase-js` ไปแล้ว แต่รันคำสั่งนี้ซ้ำได้เพื่อเพิ่ม `@supabase/ssr`

---

# Slide 7: Environment Variables

## File

```text
.env.local
```

## ตำแหน่งที่วาง

ตรวจไฟล์ `.env.local` ที่ project root ระดับเดียวกับ `package.json`; ถ้ามีจาก Day 4 แล้วให้แก้ค่าเดิม ไม่ต้องสร้างซ้ำ

## ต้องมี

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

## `.env.example`

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
```

## Key Message

Auth และ database ใช้ project URL/key ชุดเดียวกัน แต่ห้ามใส่ secret ลง GitHub

---

# Slide 8: Browser Client

## File

```text
src/lib/supabase/client.ts
```

## ตำแหน่งที่วาง

สร้างไฟล์ใหม่ `src/lib/supabase/client.ts` แล้วใส่ code นี้เป็นเนื้อหาทั้งไฟล์ ใช้สำหรับ client-side auth เท่านั้น

## Code

```ts
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );
}
```

## ใช้เมื่อไร

ใช้ใน Client Component ถ้าต้องต่อยอด auth ฝั่ง browser ในอนาคต

---

# Slide 9: Server Client

## File

```text
src/lib/supabase/server.ts
```

## ตำแหน่งที่แก้

ใช้ code นี้แทนเนื้อหาเดิมของ `src/lib/supabase/server.ts` จาก Day 4 เพราะ Day 5 ต้องใช้ SSR-aware client ที่อ่าน session cookie ได้

## Code

```ts
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Server Components cannot always set cookies.
        }
      },
    },
  }
  );
}
```

## ใช้เมื่อไร

ใช้ใน Server Component, Server Action, Route Handler

---

# Slide 10: Proxy สำหรับ Refresh Session

## File

```text
src/lib/supabase/proxy.ts
```

## ตำแหน่งที่วาง

สร้างไฟล์ใหม่ `src/lib/supabase/proxy.ts` แล้วใส่ code นี้เป็นเนื้อหาทั้งไฟล์

## Code

```ts
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  }
  );

  await supabase.auth.getClaims();

  return response;
}
```

---

# Slide 11: Root Proxy File

## File

```text
proxy.ts
```

## ตำแหน่งที่วาง

สร้างไฟล์ `proxy.ts` ที่ project root ระดับเดียวกับ `package.json` และ `next.config.*` ไม่ใช่ใน `src/app`

## Code

```ts
import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

export async function proxy(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
  "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
```

## Key Message

Proxy ช่วยให้ session cookie สดใหม่ก่อน Server Component และ Server Action อ่าน user

---

# Slide 12: ปรับ Supabase Client จาก Day 4

## Day 4

เราใช้ client แบบง่าย:

```text
src/lib/supabase/server.ts
createSupabaseServerClient()
```

## Day 5

เราจะใช้ SSR-aware client:

```text
src/lib/supabase/server.ts
createClient()
```

## สิ่งที่ต้องทำ

ไฟล์ที่ import `createSupabaseServerClient` ต้องเปลี่ยนมาใช้ `createClient`

---

# Slide 13: ตัวอย่างปรับ `src/lib/issues.ts`

## File

```text
src/lib/issues.ts
```

## ตำแหน่งที่แก้

แก้ import ด้านบนของไฟล์จาก `createSupabaseServerClient` เป็น `createClient` แล้วในทุก function ที่เคยมี `const supabase = createSupabaseServerClient();` ให้เปลี่ยนเป็น `const supabase = await createClient();`

## ก่อน

```ts
const supabase = createSupabaseServerClient();
```

## หลัง

```ts
import { createClient } from "@/lib/supabase/server";

const supabase = await createClient();
```

## Key Message

ตั้งแต่ Day 5 query database ควรใช้ client ที่รู้จัก session ของผู้ใช้

---

# Slide 14: Auth Scope สำหรับ Bootcamp

## Core สำหรับนักศึกษา

ใช้ Supabase Auth แบบ email/password และ account ที่ผู้สอนเตรียมไว้ เพื่อให้ทุกคนเริ่มใช้งานได้ง่าย

## ไม่ทำเป็น core

ไม่ทำ Google OAuth และ register flow ในคอร์สหลัก

เหตุผล:

- ต้องตั้งค่าเพิ่ม
- ใช้เวลามากกว่าการทำ auth concept
- เสี่ยงหลุดจากเป้าหมายเรื่อง login, session, role และ RLS

## Key Message

เรียน flow auth ให้เข้าใจก่อน แล้วค่อยต่อยอด register/OAuth หลัง bootcamp ได้

---

# Slide 15: Supabase SSR Setup

## ขั้นตอน

1. ติดตั้ง `@supabase/ssr`
2. สร้าง `src/lib/supabase/client.ts`
3. ปรับ `src/lib/supabase/server.ts`
4. สร้าง `src/lib/supabase/proxy.ts`
5. สร้าง `proxy.ts`
6. ปรับ `src/lib/issues.ts` ให้ใช้ `await createClient()`
7. restart dev server
8. เปิด `/issues` ตรวจว่ายังอ่านข้อมูลได้

---

# Slide 16: โค้ดสุดท้ายของ Supabase SSR Setup

## ไฟล์ที่ควรมีหลังจบชั่วโมงนี้

```text
src/lib/supabase/client.ts
src/lib/supabase/server.ts
src/lib/supabase/proxy.ts
proxy.ts
```

## `src/lib/supabase/server.ts`

ทุก Server Component และ Server Action ควรใช้ client ตัวนี้:

```ts
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {}
      },
    },
  }
  );
}
```

## `src/lib/issues.ts`

function ที่ query Supabase ต้องเปลี่ยนมาใช้:

```ts
import { createClient } from "@/lib/supabase/server";

const supabase = await createClient();
```

---

# Slide 17: Common Mistakes

## ข้อผิดพลาดที่พบบ่อย

- ลืมติดตั้ง `@supabase/ssr`
- ใช้ server client ใน Client Component
- ใช้ browser client ใน Server Action
- ลืม `await createClient()`
- proxy matcher เขียนผิด
- env var ไม่ตรงกับ key ใหม่ของ Supabase
- คิดว่า login แล้วไม่ต้องมี RLS

---

# Slide 18: Recap ชั่วโมงแรกของ Day 5

## สิ่งที่ได้เรียน

- Authentication คือรู้ว่า user คือใคร
- Authorization คือรู้ว่า user ทำอะไรได้
- Next.js App Router ควรใช้ cookie-based auth สำหรับ SSR
- Supabase Auth ใช้ร่วมกับ `@supabase/ssr`
- ต้องมี browser client, server client และ proxy
- Day 5 จะค่อย ๆ เปลี่ยน demo-public CRUD เป็น authenticated CRUD

## ต่อไป

เราจะสร้าง login/logout และ protect route สำคัญ เช่น `/issues/new`

---


---

# อ้างอิงสำหรับผู้สอน

- [Use Supabase Auth with Next.js](https://supabase.com/docs/guides/auth/quickstarts/nextjs)
- [Creating a Supabase client for SSR](https://supabase.com/docs/guides/auth/server-side/nextjs)













