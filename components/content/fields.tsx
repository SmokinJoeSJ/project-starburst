'use client';
import {
  createContext,
  useContext,
  useState,
  Fragment,
  type ImgHTMLAttributes,
  type IframeHTMLAttributes,
  type ReactNode,
} from 'react';
import {
  approvedContent,
  type ContentDocument,
  type FieldId,
} from '@/lib/content/approved';
export type ContentState = {
  document: ContentDocument;
  media: Record<string, string>;
  mode: 'edit' | 'read-only' | 'public';
  selected: string | null;
};
const defaults: ContentState = {
  document: approvedContent,
  media: {},
  mode: 'public',
  selected: null,
};
const ContentContext = createContext<ContentState>(defaults);
export function ContentProvider({
  value,
  children,
}: {
  value: ContentState;
  children: ReactNode;
}) {
  return (
    <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
  );
}
export function ContentText({
  fieldId,
  breakClass,
}: {
  fieldId: FieldId;
  breakClass?: string;
}) {
  const state = useContext(ContentContext);
  const value = state.document.values[fieldId];
  if (typeof value !== 'string')
    throw new Error('Expected text field: ' + fieldId);
  return (
    <span
      data-plm-field={fieldId}
      style={{ display: state.mode === 'public' ? 'contents' : undefined }}
      role={state.mode === 'edit' ? 'button' : undefined}
      tabIndex={state.mode === 'edit' ? 0 : undefined}
    >
      {value.split('\n').map((line, i) => (
        <Fragment key={i}>
          {i > 0 && <br className={breakClass} />}
          {line}
        </Fragment>
      ))}
    </span>
  );
}
export function ContentImage({
  imageField,
  altField,
  src,
  alt,
  ...props
}: ImgHTMLAttributes<HTMLImageElement> & {
  imageField?: FieldId;
  altField?: FieldId;
}) {
  const state = useContext(ContentContext);
  const [failedSource, setFailedSource] = useState<string | null>(null);
  const replacement =
    imageField === undefined ? null : state.document.values[imageField];
  let source = src;
  if (replacement !== null && typeof replacement === 'object') {
    source =
      state.media[replacement.assetId] ??
      state.document.media?.[replacement.assetId];
    if (!source) throw new Error('Missing validated image reference');
  }
  const description =
    altField === undefined ? alt : state.document.values[altField];
  return (
    <>
      <img
        {...props}
        onError={(event) => {
          props.onError?.(event);
          if (state.mode !== 'public' && typeof source === 'string')
            setFailedSource(source);
        }}
        src={source}
        alt={typeof description === 'string' ? description : alt}
        data-plm-field={imageField}
        data-plm-alt-field={altField}
        role={state.mode === 'edit' ? 'button' : undefined}
        tabIndex={state.mode === 'edit' && imageField ? 0 : undefined}
      />
      {state.mode !== 'public' && failedSource === source && (
        <output className="plm-image-error">
          This draft image could not load. Refresh its media access in PLM
          Studio.
        </output>
      )}
    </>
  );
}

export function ContentFrame({
  src,
  ...props
}: IframeHTMLAttributes<HTMLIFrameElement>) {
  const state = useContext(ContentContext);
  return (
    <iframe
      {...props}
      title={props.title}
      src={state.mode === 'public' ? src : undefined}
      tabIndex={state.mode === 'public' ? props.tabIndex : -1}
      sandbox={state.mode === 'public' ? props.sandbox : ''}
    />
  );
}
