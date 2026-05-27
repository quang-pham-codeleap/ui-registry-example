import React from 'react';
import type { editor } from 'monaco-editor';

// Use type-only imports to avoid runtime dependency on monaco-editor
// The actual monaco instance is provided by @monaco-editor/react at runtime
type IMouseTarget = editor.IMouseTarget;
type IStandaloneCodeEditor = editor.IStandaloneCodeEditor;
type IContentWidget = editor.IContentWidget;

// Define ContentWidgetPositionPreference locally to avoid runtime import
// Values from monaco-editor: EXACT = 0, ABOVE = 1, BELOW = 2
const ContentWidgetPositionPreference = {
  EXACT: 0,
  ABOVE: 1,
  BELOW: 2,
} as const;

export type TDropHandler = (e: React.DragEvent, target: IMouseTarget, instance: IStandaloneCodeEditor) => void;
export type TInstanceGetter = () => IStandaloneCodeEditor | null;

export class MonacoDragNDropProvider {
  getInstance: TInstanceGetter;
  dropClassName: string;
  onDropHandler: TDropHandler;

  constructor(onDrop: TDropHandler, getInstance: TInstanceGetter, dropClassName: string = 'drop') {
    this.dropClassName = dropClassName;
    this.onDropHandler = onDrop;
    this.getInstance = getInstance;
  }

  onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const instance = this.getInstance();
    if (this.onDropHandler && this.dragTarget && instance) {
      this.onDropHandler(e, this.dragTarget, instance);
    }
    this.removeMouseDownWidget();
  };

  onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    const instance = this.getInstance();
    const target = instance?.getTargetAtClientPoint(e.clientX, e.clientY);
    if (instance && target) {
      this.displayMouseDropPosition(instance, target);
    }
    e.preventDefault();
  };

  removeMouseDownWidget = () => {
    const instance = this.getInstance();
    if (instance && this.mouseDropWidget && this.domNode) {
      instance.removeContentWidget(this.mouseDropWidget);
      this.mouseDropWidget = null;
    }
  };

  props: React.HTMLAttributes<HTMLDivElement> = {
    onDragOver: this.onDragOver,
    onDropCapture: this.onDrop,
    onDragLeaveCapture: this.removeMouseDownWidget,
  };

  domNode: HTMLDivElement | null = null;
  mouseDropWidget: IContentWidget | null = null;
  dragTarget: IMouseTarget | null = null;

  buildMouseDropWidget = (): IContentWidget => {
    if (!this.domNode) {
      this.domNode = document.createElement('div');
      this.domNode.className = this.dropClassName;
      this.domNode.style.pointerEvents = 'none';
      this.domNode.style.borderLeft = '2px solid #ccc';
      this.domNode.innerHTML = '&nbsp;';
    }
    return {
      getId: () => 'drag',
      getDomNode: () => this.domNode as HTMLElement,
      getPosition: () => ({
        position: this.dragTarget?.position ?? null,
        preference: [ContentWidgetPositionPreference.EXACT, ContentWidgetPositionPreference.EXACT],
      }),
    };
  };

  displayMouseDropPosition = (instance: IStandaloneCodeEditor, target: IMouseTarget) => {
    this.dragTarget = target;
    if (this.mouseDropWidget) {
      instance.layoutContentWidget(this.mouseDropWidget);
    } else {
      this.mouseDropWidget = this.buildMouseDropWidget();
      instance.addContentWidget(this.mouseDropWidget);
    }
  };
}
