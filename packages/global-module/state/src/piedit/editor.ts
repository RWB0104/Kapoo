/**
 * 에디터 상태 모듈
 *
 * @author RWB
 * @since 2024.09.04 Wed 17:43:10
 */

import { create } from 'zustand';

export interface EditorProps
{
	/**
	 * 미리보기
	 */
	preview: boolean;

	/**
	 * 래핑
	 */
	wrap: boolean;
}

export type SetEditorHandler = (editor: EditorStoreProps | Partial<EditorStoreProps> | ((state: EditorStoreProps) => EditorStoreProps | Partial<EditorStoreProps>)) => void;

export interface EditorStoreProps
{
	/**
	 * 에디터
	 */
	editorState: EditorProps;

	/**
	 * 에디터 할당 메서드
	 */
	setEditorState: SetEditorHandler;
}

export const editorStore = create<EditorStoreProps>((set) => ({
	editorState: { preview: true, wrap: true },
	setEditorState: (editor): void =>
	{
		set(editor);
	}
}));