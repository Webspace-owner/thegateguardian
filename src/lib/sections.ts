// Section type registry shared by builder + renderer

export type FieldType = "text" | "textarea" | "image" | "url" | "checkbox" | "select";
export type SectionField = { key: string; label: string; type?: FieldType; options?: string[]; placeholder?: string };
export type SectionItemSchema = { label: string; fields: SectionField[] };
export type SectionDef = {
  type: string;
  label: string;
  description?: string;
  fields: SectionField[];
  items?: SectionItemSchema; // optional repeatable list under data.items
};

export const SECTION_TYPES: SectionDef[] = [
  {
    type: "hero",
    label: "Hero",
    description: "Big headline with optional image and CTAs.",
    fields: [
      { key: "eyebrow", label: "Eyebrow text" },
      { key: "title", label: "Headline" },
      { key: "subtitle", label: "Subheadline", type: "textarea" },
      { key: "image", label: "Background image", type: "image" },
      { key: "cta_label", label: "Primary button label" },
      { key: "cta_href", label: "Primary button link", type: "url" },
      { key: "cta2_label", label: "Secondary button label" },
      { key: "cta2_href", label: "Secondary button link", type: "url" },
      { key: "align", label: "Alignment", type: "select", options: ["left", "center"] },
    ],
  },
  {
    type: "text",
    label: "Rich text",
    fields: [
      { key: "title", label: "Title" },
      { key: "body", label: "Body (paragraphs separated by blank lines)", type: "textarea" },
      { key: "align", label: "Alignment", type: "select", options: ["left", "center"] },
    ],
  },
  {
    type: "features",
    label: "Features grid",
    fields: [{ key: "title", label: "Title" }, { key: "subtitle", label: "Subtitle", type: "textarea" }],
    items: { label: "Feature", fields: [
      { key: "icon", label: "Lucide icon (e.g. shield, server)" },
      { key: "title", label: "Title" },
      { key: "description", label: "Description", type: "textarea" },
    ] },
  },
  {
    type: "gallery",
    label: "Image gallery",
    fields: [{ key: "title", label: "Title" }],
    items: { label: "Image", fields: [
      { key: "image", label: "Image", type: "image" },
      { key: "caption", label: "Caption" },
    ] },
  },
  {
    type: "cta",
    label: "Call to action",
    fields: [
      { key: "title", label: "Title" },
      { key: "subtitle", label: "Subtitle", type: "textarea" },
      { key: "button_label", label: "Button label" },
      { key: "button_href", label: "Button link", type: "url" },
    ],
  },
  {
    type: "testimonials",
    label: "Testimonials",
    fields: [{ key: "title", label: "Title" }],
    items: { label: "Testimonial", fields: [
      { key: "quote", label: "Quote", type: "textarea" },
      { key: "name", label: "Author name" },
      { key: "role", label: "Role / company" },
    ] },
  },
  {
    type: "logos",
    label: "Logo strip / Partners",
    fields: [{ key: "title", label: "Title" }],
    items: { label: "Partner", fields: [
      { key: "name", label: "Name" },
      { key: "logo", label: "Logo (optional)", type: "image" },
    ] },
  },
  {
    type: "faq",
    label: "FAQ",
    fields: [{ key: "title", label: "Title" }],
    items: { label: "Q&A", fields: [
      { key: "q", label: "Question" },
      { key: "a", label: "Answer", type: "textarea" },
    ] },
  },
  {
    type: "html",
    label: "Custom HTML",
    fields: [{ key: "html", label: "Raw HTML", type: "textarea" }],
  },
];

export const SECTION_MAP = Object.fromEntries(SECTION_TYPES.map((s) => [s.type, s]));
