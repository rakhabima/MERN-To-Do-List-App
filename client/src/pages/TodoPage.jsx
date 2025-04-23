import { useEffect, useState } from 'react';
import {
    getTodos,
    createTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
} from '../api/todoApi';

import Sidebar from '../components/Sidebar';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function TodoPage() {
    const [todos, setTodos] = useState([]);
    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newCategory, setNewCategory] = useState('');
    const [newPriority, setNewPriority] = useState('medium');
    const [editingId, setEditingId] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [showConfirm, setShowConfirm] = useState(false);
    const [todoToDelete, setTodoToDelete] = useState(null);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState('all');
    const [inputError, setInputError] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        setLoading(true);
        const data = await getTodos();
        setTodos(data);
        setLoading(false);
    };

    const handleAdd = async () => {
        if (!newTitle.trim()) {
            setInputError('Judul tidak boleh kosong');
            return;
        }
        setInputError('');
        setLoading(true);
        try {
            await createTodo({
                title: String(newTitle),
                description: String(newDescription || ''),
                category: String(newCategory || ''),
                priority: String(newPriority || 'medium'),
            });
            setNewTitle('');
            setNewDescription('');
            setNewCategory('');
            setNewPriority('medium');
            setShowAddModal(false);
            fetchTodos();
        } catch (err) {
            setInputError('Gagal menambahkan to-do. Periksa inputan.');
        }
        setLoading(false);
    };

    const handleToggle = async (id, status) => {
        if (status === 'selesai') return;
        await toggleTodo(id);
        fetchTodos();
    };

    const handleDelete = async () => {
        if (!todoToDelete) return;
        await deleteTodo(todoToDelete);
        setTodoToDelete(null);
        setShowConfirm(false);
        fetchTodos();
    };

    const handleUpdate = async (id) => {
        if (!editTitle.trim()) return;
        await updateTodo(id, { title: editTitle });
        setEditingId(null);
        setEditTitle('');
        fetchTodos();
    };

    const filteredTodos = todos.filter((todo) => {
        if (filter === 'all') return true;
        return filter === 'selesai' ? todo.status === 'selesai' : todo.status !== 'selesai';
    });

    return (
        <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            <main className="flex-1 p-6">
                <h1 className="text-3xl font-bold mb-4 text-center">KERJAIN KOCAK JANGAN MALES!!!</h1>

                <div className="flex justify-center mb-6 gap-4">
                    {['all', 'belum', 'selesai'].map((item) => (
                        <button
                            key={item}
                            onClick={() => setFilter(item)}
                            className={`px-4 py-1 rounded-full border ${filter === item
                                ? 'bg-blue-600 text-white'
                                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-white'
                                }`}
                        >
                            {item.charAt(0).toUpperCase() + item.slice(1)}
                        </button>
                    ))}
                </div>

                <div className="flex justify-center mb-6">
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition duration-200"
                    >
                        Tambah To-Do
                    </button>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredTodos.length === 0 && !loading && (
                        <p className="text-center col-span-full text-gray-500">Belum ada to-do.</p>
                    )}
                    {filteredTodos.map((todo) => (
                        <div
                            key={todo._id}
                            className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 transition-all hover:scale-[1.02] border-2 ${todo.priority === 'high'
                                    ? 'border-red-400'
                                    : todo.priority === 'medium'
                                        ? 'border-yellow-400'
                                        : 'border-green-400'
                                }`}
                        >

                            <div className="flex items-center mb-2">
                                <input
                                    type="checkbox"
                                    checked={todo.status === 'selesai'}
                                    disabled={todo.status === 'selesai'}
                                    onChange={() => handleToggle(todo._id, todo.status)}
                                    className="mr-2"
                                />
                                {editingId === todo._id ? (
                                    <input
                                        value={editTitle}
                                        onChange={(e) => setEditTitle(e.target.value)}
                                        className="flex-1 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none"
                                        autoFocus
                                    />
                                ) : (
                                    <span className={`flex-1 font-medium ${todo.status === 'selesai' ? 'line-through opacity-60 italic text-gray-500' : ''}`}>
                                        {todo.title}
                                    </span>
                                )}
                            </div>
                            {todo.description && <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{todo.description}</p>}
                            <div className="flex justify-between items-center mt-2">
                                <span className={`text-xs px-2 py-1 rounded-full font-semibold capitalize ${todo.priority === 'high' ? 'bg-red-100 text-red-700' :
                                        todo.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                                            'bg-green-100 text-green-700'
                                    }`}>
                                    {todo.priority}
                                </span>

                                {todo.category && <span className="text-xs italic text-gray-500">#{todo.category}</span>}
                            </div>
                            <div className="mt-3 flex justify-end space-x-2 text-sm">
                                {editingId === todo._id ? (
                                    <>
                                        <button onClick={() => handleUpdate(todo._id)} className="text-green-500 hover:text-green-600 transition duration-200">
                                            Simpan
                                        </button>
                                        <button onClick={() => setEditingId(null)} className="text-gray-500 hover:text-gray-600 transition duration-200">
                                            Batal
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        {todo.status !== 'selesai' && (
                                            <button
                                                onClick={() => { setEditingId(todo._id); setEditTitle(todo.title); }}
                                                className="text-blue-500 hover:text-blue-600 transition duration-200"
                                            >
                                                <PencilSquareIcon className="h-5 w-5" />
                                            </button>
                                        )}
                                        <button
                                            onClick={() => { setShowConfirm(true); setTodoToDelete(todo._id); }}
                                            className="text-red-500 hover:text-red-600 transition duration-200"
                                        >
                                            <TrashIcon className="h-5 w-5" />
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {showConfirm && (
                    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-[90%] max-w-sm shadow-lg text-center">
                            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Hapus To-Do?</h2>
                            <p className="text-gray-600 dark:text-gray-300 mb-6">To-do ini akan dihapus permanen.</p>
                            <div className="flex justify-center gap-3">
                                <button
                                    onClick={() => setShowConfirm(false)}
                                    className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                                >
                                    Batal
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                                >
                                    Hapus
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {showAddModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 transition-all duration-300 ease-out">
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-[90%] max-w-md shadow-lg transform scale-95 animate-fade-in-up">
                            <h2 className="text-lg font-semibold mb-4 text-center text-gray-900 dark:text-white">Tambah To-Do Baru</h2>
                            <input
                                value={newTitle}
                                onChange={(e) => setNewTitle(e.target.value)}
                                placeholder="Judul"
                                className="w-full mb-2 p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-900"
                            />
                            <textarea
                                value={newDescription}
                                onChange={(e) => setNewDescription(e.target.value)}
                                placeholder="Deskripsi (opsional)"
                                className="w-full mb-2 p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-900"
                            ></textarea>
                            <input
                                value={newCategory}
                                onChange={(e) => setNewCategory(e.target.value)}
                                placeholder="Kategori (opsional)"
                                className="w-full mb-2 p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-900"
                            />
                            <select
                                value={newPriority}
                                onChange={(e) => setNewPriority(e.target.value)}
                                className="w-full mb-4 p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-900"
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                            <div className="flex justify-end gap-2">
                                <button
                                    onClick={() => setShowAddModal(false)}
                                    className="px-4 py-2 rounded-lg bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-500"
                                >
                                    Batal
                                </button>
                                <button
                                    onClick={handleAdd}
                                    disabled={loading}
                                    className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition duration-200 disabled:opacity-50"
                                >
                                    Tambah
                                </button>
                            </div>
                            {inputError && <p className="text-red-500 text-sm mt-2 text-center">{inputError}</p>}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
