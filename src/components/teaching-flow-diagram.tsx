import {
  CheckCircle2,
  Code2,
  Database,
  FilePenLine,
  GitBranch,
  GitPullRequest,
  Globe2,
  Monitor,
  Send,
  ServerCog,
  ShieldCheck,
  UploadCloud,
  UserRound,
  XCircle,
} from "lucide-react";
import type { ComponentType } from "react";

type DiagramRole =
  | "action"
  | "client"
  | "data"
  | "decision"
  | "deploy"
  | "repo"
  | "server"
  | "success"
  | "tool"
  | "user"
  | "warning";

type FlowStep = {
  detail: string;
  icon: ComponentType<{ size?: number; "aria-hidden"?: boolean }>;
  role: DiagramRole;
  title: string;
};

type FlowBranch = {
  detail: string;
  role: DiagramRole;
  title: string;
};

type FlowDiagram = {
  caption: string;
  connectors: string[];
  steps: FlowStep[];
  branches?: FlowBranch[];
};

const diagrams = {
  "bootcamp-map": {
    caption:
      "Bootcamp เริ่มจาก static web page แล้วค่อยต่อยอดเป็น Next.js, CRUD, database, authentication และ deployment",
    connectors: ["ต่อยอด", "เพิ่มข้อมูล", "ป้องกัน", "ส่งขึ้นใช้"],
    steps: [
      {
        title: "Web Page",
        detail: "HTML, CSS prototype",
        role: "client",
        icon: Code2,
      },
      {
        title: "Next.js",
        detail: "components, routing",
        role: "tool",
        icon: Globe2,
      },
      {
        title: "CRUD",
        detail: "create, read, update",
        role: "action",
        icon: FilePenLine,
      },
      {
        title: "Auth + Data",
        detail: "login, users, issues",
        role: "server",
        icon: ShieldCheck,
      },
      {
        title: "Deploy",
        detail: "ใช้งานจริง",
        role: "deploy",
        icon: UploadCloud,
      },
    ],
  },
  "system-overview": {
    caption:
      "ผู้ใช้ทำงานผ่าน browser และ frontend จากนั้น frontend ติดต่อ backend เพื่ออ่านหรือเขียนข้อมูลใน database",
    connectors: [
      "คลิก / กรอกข้อมูล",
      "แสดงหน้าเว็บ",
      "request / response",
      "read / write",
    ],
    steps: [
      {
        title: "User",
        detail: "ผู้ใช้งาน",
        role: "user",
        icon: UserRound,
      },
      {
        title: "Browser",
        detail: "Chrome, Edge, Safari",
        role: "client",
        icon: Monitor,
      },
      {
        title: "Frontend",
        detail: "HTML, CSS, TypeScript",
        role: "client",
        icon: Globe2,
      },
      {
        title: "Backend",
        detail: "Validation, Auth, API",
        role: "server",
        icon: ServerCog,
      },
      {
        title: "Database",
        detail: "Issues, Users",
        role: "data",
        icon: Database,
      },
    ],
  },
  "issue-submit-flow": {
    caption:
      "การแจ้งปัญหาเริ่มจากเปิดฟอร์ม กรอกข้อมูล ส่งข้อมูลไปให้ backend ตรวจสอบ แล้วจึงบันทึกหรือแสดง error",
    connectors: ["ต่อไป", "ส่งข้อมูล", "ตรวจสอบ"],
    steps: [
      {
        title: "เปิดหน้าแจ้งปัญหา",
        detail: "User เข้าหน้าฟอร์ม",
        role: "action",
        icon: Globe2,
      },
      {
        title: "กรอกข้อมูล",
        detail: "title, detail, contact",
        role: "action",
        icon: FilePenLine,
      },
      {
        title: "กด Submit",
        detail: "Frontend ส่ง request",
        role: "client",
        icon: Send,
      },
      {
        title: "Backend validate",
        detail: "ผ่านหรือไม่ผ่าน",
        role: "decision",
        icon: ShieldCheck,
      },
    ],
    branches: [
      {
        title: "ผ่าน",
        detail: "บันทึกลง database แล้วแสดงข้อความสำเร็จ",
        role: "success",
      },
      {
        title: "ไม่ผ่าน",
        detail: "แสดง error และให้ผู้ใช้กลับไปแก้ form",
        role: "warning",
      },
    ],
  },
  "runtime-flow": {
    caption:
      "ตอนระบบถูกใช้งานจริง ผู้ใช้เห็น frontend ส่วน backend กับ auth ตรวจสอบก่อนอ่านหรือเขียนข้อมูลใน database",
    connectors: [
      "เปิดหน้าเว็บ",
      "render UI",
      "request / response",
      "read / write",
    ],
    steps: [
      {
        title: "User",
        detail: "ผู้ใช้งาน",
        role: "user",
        icon: UserRound,
      },
      {
        title: "Browser",
        detail: "เปิดเว็บ",
        role: "client",
        icon: Monitor,
      },
      {
        title: "Frontend",
        detail: "HTML, CSS, TypeScript",
        role: "client",
        icon: Code2,
      },
      {
        title: "Backend + Auth",
        detail: "validate, permission",
        role: "server",
        icon: ShieldCheck,
      },
      {
        title: "Database",
        detail: "issues, users",
        role: "data",
        icon: Database,
      },
    ],
  },
  "development-flow": {
    caption:
      "ตอนพัฒนา เราเขียนโค้ดใน VS Code, commit ด้วย Git, push ไป GitHub แล้วค่อย deploy ขึ้นใช้งาน",
    connectors: ["save changes", "push", "deploy pipeline"],
    steps: [
      {
        title: "VS Code",
        detail: "เขียน HTML, CSS, TypeScript",
        role: "tool",
        icon: Code2,
      },
      {
        title: "Git",
        detail: "commit",
        role: "tool",
        icon: GitBranch,
      },
      {
        title: "GitHub",
        detail: "เก็บ source code",
        role: "repo",
        icon: GitPullRequest,
      },
      {
        title: "Deploy",
        detail: "เอาขึ้นใช้งาน",
        role: "deploy",
        icon: UploadCloud,
      },
    ],
  },
} satisfies Record<string, FlowDiagram>;

export type TeachingFlowDiagramVariant = keyof typeof diagrams;

type TeachingFlowDiagramProps = {
  variant: TeachingFlowDiagramVariant;
};

export function TeachingFlowDiagram({ variant }: TeachingFlowDiagramProps) {
  const diagram: FlowDiagram = diagrams[variant];

  return (
    <figure className={`teaching-flow teaching-flow--${variant}`}>
      <figcaption className="teaching-flow__caption">
        {diagram.caption}
      </figcaption>

      <ol className="teaching-flow__steps" aria-label={diagram.caption}>
        {diagram.steps.map((step, index) => {
          const Icon = step.icon;
          const connector = diagram.connectors[index];

          return (
            <li className="teaching-flow__item" key={step.title}>
              <div
                className={`teaching-flow__node teaching-flow__node--${step.role}`}
              >
                <span className="teaching-flow__icon">
                  <Icon size={22} aria-hidden />
                </span>
                <span className="teaching-flow__node-text">
                  <strong>{step.title}</strong>
                  <span>{step.detail}</span>
                </span>
              </div>

              {connector ? (
                <div className="teaching-flow__connector" aria-hidden="true">
                  <span className="teaching-flow__connector-line" />
                  <span className="teaching-flow__connector-label">
                    {connector}
                  </span>
                </div>
              ) : null}
            </li>
          );
        })}
      </ol>

      {diagram.branches ? (
        <div className="teaching-flow__branches" aria-label="Flow outcomes">
          {diagram.branches.map((branch) => {
            const BranchIcon = branch.role === "success" ? CheckCircle2 : XCircle;

            return (
              <div
                className={`teaching-flow__branch teaching-flow__branch--${branch.role}`}
                key={branch.title}
              >
                <BranchIcon size={20} aria-hidden />
                <strong>{branch.title}</strong>
                <span>{branch.detail}</span>
              </div>
            );
          })}
        </div>
      ) : null}
    </figure>
  );
}
