"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface UIContextValue {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  toggleMenu: () => void;
  modalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  /** Active Position tab (chapter 02); the guided path in chapter 00b sets it. */
  positionTab: number;
  setPositionTab: (i: number) => void;
  /** Whether chapter 02 is still auto-advancing (stops on first real interaction). */
  positionAuto: boolean;
  stopPositionAuto: () => void;
}

const UIContext = createContext<UIContextValue | null>(null);

export function UIProvider({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [positionTab, setPositionTab] = useState(2); // "Stuck" — the original default
  const [positionAuto, setPositionAuto] = useState(true);

  const stopPositionAuto = useCallback(() => setPositionAuto(false), []);

  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => setModalOpen(false), []);
  const toggleMenu = useCallback(() => setMenuOpen((o) => !o), []);

  // Body classes drive the CSS: `lock` freezes scroll while any overlay is
  // open; `menu-open` morphs the masthead button into Close and lifts the
  // masthead above the contents overlay.
  useEffect(() => {
    const cl = document.body.classList;
    cl.toggle("lock", menuOpen || modalOpen);
    cl.toggle("menu-open", menuOpen);
    return () => {
      cl.remove("lock", "menu-open");
    };
  }, [menuOpen, modalOpen]);

  // Escape closes the topmost overlay (modal first, then menu).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (modalOpen) setModalOpen(false);
      else if (menuOpen) setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen, modalOpen]);

  const value = useMemo<UIContextValue>(
    () => ({
      menuOpen,
      setMenuOpen,
      toggleMenu,
      modalOpen,
      openModal,
      closeModal,
      positionTab,
      setPositionTab,
      positionAuto,
      stopPositionAuto,
    }),
    [menuOpen, toggleMenu, modalOpen, openModal, closeModal, positionTab, positionAuto, stopPositionAuto],
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI(): UIContextValue {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used within <UIProvider>");
  return ctx;
}
