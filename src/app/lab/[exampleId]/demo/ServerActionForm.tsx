'use client';

import { useFormState } from 'react-dom';
import { submitForm } from './actions';

// 定义表单状态类型
interface FormState {
  message: string;
  errors: {
    username?: string[];
    email?: string[];
    [key: string]: string[] | undefined;
  };
}

// 初始表单状态
const initialState: FormState = {
  message: '',
  errors: {},
};

export default function ServerActionForm() {
  const [state, formAction] = useFormState<FormState, FormData>(submitForm, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label className="block mb-1 font-medium">用户名</label>
        <input
          type="text"
          name="username"
          required
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">邮箱</label>
        <input
          type="email"
          name="email"
          required
          className="w-full p-2 border rounded-md"
        />
        {state.errors.email && (
          <p className="text-red-500 text-sm mt-1">{state.errors.email}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 bg-green-600 text-white rounded-md"
      >
        提交（服务器操作）
      </button>

      {state.message && (
        <p className={`p-3 rounded-md ${state.message.includes('成功') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {state.message}
        </p>
      )}
    </form>
  );
}