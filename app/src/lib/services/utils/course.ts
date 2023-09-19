import type { Course } from "$lib/services/models/lo-types";
import type { IconType } from "$lib/services/models/lo-types";
import type { Lo } from "$lib/services/models/lo-types";
import { writeObj } from "$lib/services/utils/firebase";

export interface CourseSummary {
  title: string;
  visits: number;
  count: number;
  img: string;
  icon: IconType;
  route: string;
  isPrivate: boolean;
  currentLo: any;
  studentIds: Set<string>;
}

export function isValidCourseName(course: string) {
  const invalidPatterns = /^(main--|master--|deploy-preview--)|-{2}/;
  return !invalidPatterns.test(course) && course.length <= 27;
}

export async function getCourseSummary(courseId: string): Promise<CourseSummary> {
  const response = await fetch(`https://${courseId}.netlify.app/tutors.json`);
  const lo = await response.json();
  const courseUrl = `${courseId}.netlify.app`;

  return {
    title: lo.title,
    img: lo.img.replace("{{COURSEURL}}", courseUrl),
    icon: lo.properties?.icon,
    route: `https://tutors.dev/course/${courseUrl}`,
    visits: 0,
    count: 0,
    isPrivate: lo.properties?.private,
    currentLo: null,
    studentIds: new Set<string>()
  };
}

export function updateLo(root: string, course: Course, currentLo: Lo) {
  const lo = {
    // currentLo.type === "course" ? currentLo.icon : currentLo.frontMatter?.icon ? { type: currentLo.frontMatter.icon["type"], color: currentLo.frontMatter.icon["color"] } : {},
    img: currentLo.img,
    title: currentLo.title,
    courseTitle: course.title,
    subRoute: currentLo.route,
    isPrivate: course.properties?.private ? course.properties.private : 0,
    tutorsTimeId: getTutorsTimeId(course)
  };
  if (currentLo.icon) {
    lo.icon = currentLo.icon;
  }
  writeObj(`${root}/lo`, lo);
}

function generateTutorsTimeId() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function getTutorsTimeId(course: Course) {
  if (course.properties?.authLevel) {
    return window.localStorage.id;
  }

  if (!window.localStorage.tutorsTimeId) {
    window.localStorage.tutorsTimeId = generateTutorsTimeId();
  }

  return window.localStorage.tutorsTimeId;
}
