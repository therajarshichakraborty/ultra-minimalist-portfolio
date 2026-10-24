import { Chip } from "@/components/chip";
import { FileTextIcon } from "@/components/icons";

export function ResumeChip() {
  return (
    <Chip href="/resume" icon={<FileTextIcon />} iconName="resume">
      résumé
    </Chip>
  );
}
