import { Chip } from "@/components/chip";
import { FileTextIcon } from "@/components/icons";

export function ResumeChip() {
  return (
    <Chip href="/resume" iconName="resume" icon={<FileTextIcon />}>
      résumé
    </Chip>
  );
}
