import { useState, useEffect } from 'react';
import styles from '@/styles/admin.module.css';

export default function ProductsManager() {
    const [products, setProducts] = useState([]);
    const [editing, setEditing] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        imageUrl: '',
        featured: false,
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(false);

        try {
            const url = editing ? `/api/products/${editing}` : '/api/products';
            const method = editing ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSuccess(true);
                setEditing(null);
                setFormData({
                    name: '',
                    description: '',
                    price: '',
                    category: '',
                    imageUrl: '',
                    featured: false,
                });
                loadProducts();
                setTimeout(() => setSuccess(false), 3000);
            }
        } catch (error) {
            console.error('Error saving product:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (product) => {
        setEditing(product._id);
        setFormData({
            name: product.name,
            description: product.description,
            price: product.price,
            category: product.category,
            imageUrl: product.imageUrl,
            featured: product.featured,
        });
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this product?')) return;

        try {
            await fetch(`/api/products/${id}`, { method: 'DELETE' });
            loadProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleCancel = () => {
        setEditing(null);
        setFormData({
            name: '',
            description: '',
            price: '',
            category: '',
            imageUrl: '',
            featured: false,
        });
    };

    return (
        <div className={styles.editorSection}>
            <h2 className={styles.editorTitle}>Products Manager</h2>
            {success && <div className={styles.successMessage}>Product saved successfully!</div>}

            {/* Product Form */}
            <form onSubmit={handleSubmit}>
                <div className={styles.formGrid}>
                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Product Name</label>
                        <input
                            type="text"
                            className={styles.formInputDark}
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Price ($)</label>
                        <input
                            type="number"
                            step="0.01"
                            className={styles.formInputDark}
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Category</label>
                        <input
                            type="text"
                            className={styles.formInputDark}
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Image URL</label>
                        <input
                            type="url"
                            className={styles.formInputDark}
                            value={formData.imageUrl}
                            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                        />
                    </div>
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Description</label>
                    <textarea
                        className={`${styles.formInputDark} ${styles.formTextarea}`}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <input
                            type="checkbox"
                            checked={formData.featured}
                            onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                        />
                        <span className={styles.formLabel} style={{ marginBottom: 0 }}>Featured Product</span>
                    </label>
                </div>
                <div className={styles.formActions}>
                    <button type="submit" className={styles.btnSave} disabled={loading}>
                        {loading ? 'Saving...' : editing ? 'Update Product' : 'Add Product'}
                    </button>
                    {editing && (
                        <button type="button" className={styles.btnCancel} onClick={handleCancel}>
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            {/* Products Table */}
            <table className={styles.productsTable}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Featured</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product._id}>
                            <td>{product.name}</td>
                            <td>{product.category}</td>
                            <td>${product.price.toFixed(2)}</td>
                            <td>{product.featured ? '⭐' : '-'}</td>
                            <td>
                                <button
                                    className={`${styles.btnSmall} ${styles.btnEdit}`}
                                    onClick={() => handleEdit(product)}
                                >
                                    Edit
                                </button>
                                <button
                                    className={`${styles.btnSmall} ${styles.btnDelete}`}
                                    onClick={() => handleDelete(product._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
