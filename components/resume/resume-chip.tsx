"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type MouseEvent,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { ChipIcon } from "@/components/chip";
import { CloseIcon, ExpandIcon, FileTextIcon, PrinterIcon } from "@/components/icons";
import { ResumePaper } from "@/components/resume/resume-paper";
import { site } from "@/content/site";

const exitMs = 220;

const noop = () => () => {};

function Action({
  label,
  href,
  onClick,
  children,
}: {
  label: string;
  href?: string;
  onClick?: () => void;
  children: ReactNode;
}) {
  const className =
    "relative grid size-7 place-items-center rounded bg-bg text-ink shadow-lift ring-1 ring-line transition-[background-color,transform] duration-150 ease-snap before:absolute before:-inset-1.5 before:content-[''] hover:bg-chip focus-visible:bg-chip active:scale-[0.94]";
  if (href) {
    return (
      <Link href={href} aria-label={label} title={label} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" aria-label={label} title={label} onClick={onClick} className={className}>
      {children}
    </button>
  );
}

export function ResumeChip() {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLAnchorElement>(null);
  const [open, setOpen] = useState(false);
  const closing = useRef(0);
  const id = useId();
  const mounted = useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );

  const finish = useCallback(() => {
    const node = dialog.current;
    if (!node) return;
    node.dataset.state = "closed";
    if (node.open) node.close();
    document.documentElement.style.removeProperty("overflow");
    setOpen(false);
  }, []);

  const close = useCallback(() => {
    const node = dialog.current;
    if (!node || node.dataset.state !== "open") return;
    node.dataset.state = "closing";
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    closing.current = window.setTimeout(finish, reduce ? 0 : exitMs);
  }, [finish]);

  const show = (event: MouseEvent<HTMLAnchorElement>) => {
    const node = dialog.current;
    if (!node || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    window.clearTimeout(closing.current);
    document.documentElement.style.overflow = "hidden";
    node.showModal();
    node.dataset.state = "opening";
    requestAnimationFrame(() => {
      node.dataset.state = "open";
    });
    setOpen(true);
  };

  useEffect(() => {
    const node = dialog.current;
    if (!node || !mounted) return;
    const cancel = (event: Event) => {
      event.preventDefault();
      close();
    };
    const closed = () => trigger.current?.focus();
    node.addEventListener("cancel", cancel);
    node.addEventListener("close", closed);
    return () => {
      node.removeEventListener("cancel", cancel);
      node.removeEventListener("close", closed);
    };
  }, [close, mounted]);

  useLayoutEffect(
    () => () => {
      window.clearTimeout(closing.current);
      finish();
    },
    [finish],
  );

  return (
    <>
      <Link
        ref={trigger}
        href="/resume"
        onClick={show}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={id}
        className="chip"
      >
        <ChipIcon name="resume">
          <FileTextIcon />
        </ChipIcon>
        résumé
      </Link>
      {mounted
        ? createPortal(
            <dialog
              ref={dialog}
              id={id}
              aria-label={`${site.name} résumé`}
              data-state="closed"
              onClick={(event) => event.target === event.currentTarget && close()}
              className="resume-dialog"
            >
              <div className="resume-sheet">
                <div className="resume-scroll">
                  <ResumePaper className="p-6 sm:p-9" />
                </div>
                <div className="absolute -top-3.5 right-3 flex gap-2">
                  <Action label="Open full page" href="/resume">
                    <ExpandIcon className="size-3.5" />
                  </Action>
                  <Action label="Print" href="/resume?print=1">
                    <PrinterIcon className="size-3.5" />
                  </Action>
                  <Action label="Close" onClick={close}>
                    <CloseIcon className="size-3.5" />
                  </Action>
                </div>
              </div>
            </dialog>,
            document.body,
          )
        : null}
    </>
  );
}
