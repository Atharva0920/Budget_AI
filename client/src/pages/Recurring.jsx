import React, { useState } from 'react';
import {
    CreditCard,
    Calendar,
    Plus,
    Edit3,
    Trash2,
    Save,
    X,
    Clock,
    CheckCircle,
    AlertTriangle,
    DollarSign,
    Wifi,
    Car,
    Home,
    Phone,
    Shield,
    Zap,
    Droplets,
    Music,
    Play,
    Gamepad2,
    Smartphone,
    MonitorSpeaker,
    Building
} from 'lucide-react';

// Import reusable components
import { Card } from '../components/ui/Card';
import { StatCard } from '../components/ui/StatCard';
import { PageHeader } from '../components/ui/PageHeader';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { useTheme } from '../hooks/useTheme';
import { formatCurrency } from '../utils/formatters';

const BillsPage = () => {
    const [editingBill, setEditingBill] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const initialNewBill = {
        name: '',
        amount: '',
        frequency: 'monthly',
        dueDay: '',
        category: 'utilities',
        color: 'blue',
        lastPaid: null
    };
    const [newBill, setNewBill] = useState(initialNewBill);

    const { darkMode, privateMode } = useTheme();

    // Sample bills data
    const [bills, setBills] = useState([
        {
            id: 1,
            name: 'Netflix',
            amount: 159,
            frequency: 'monthly',
            dueDay: 15,
            category: 'entertainment',
            color: 'red',
            icon: Play,
            lastPaid: '2025-06-15',
            isActive: true
        },
        {
            id: 2,
            name: 'Rent',
            amount: 12000,
            frequency: 'monthly',
            dueDay: 1,
            category: 'housing',
            color: 'purple',
            icon: Home,
            lastPaid: '2025-07-01',
            isActive: true
        },
        {
            id: 3,
            name: 'Internet',
            amount: 799,
            frequency: 'monthly',
            dueDay: 10,
            category: 'utilities',
            color: 'blue',
            icon: Wifi,
            lastPaid: '2025-07-10',
            isActive: true
        },
        {
            id: 4,
            name: 'Car Insurance',
            amount: 1565,
            frequency: 'monthly',
            dueDay: 20,
            category: 'insurance',
            color: 'green',
            icon: Shield,
            lastPaid: '2025-06-20',
            isActive: true
        },
        {
            id: 5,
            name: 'Phone',
            amount: 199,
            frequency: 'monthly',
            dueDay: 25,
            category: 'utilities',
            color: 'cyan',
            icon: Phone,
            lastPaid: '2025-06-25',
            isActive: true
        },
        {
            id: 6,
            name: 'Spotify',
            amount: 99,
            frequency: 'monthly',
            dueDay: 5,
            category: 'entertainment',
            color: 'emerald',
            icon: Music,
            lastPaid: '2025-07-05',
            isActive: true
        },
        {
            id: 7,
            name: 'Electricity',
            amount: 1200,
            frequency: 'monthly',
            dueDay: 28,
            category: 'utilities',
            color: 'yellow',
            icon: Zap,
            lastPaid: '2025-06-28',
            isActive: true
        },
        {
            id: 8,
            name: 'Water',
            amount: 445,
            frequency: 'monthly',
            dueDay: 12,
            category: 'utilities',
            color: 'blue',
            icon: Droplets,
            lastPaid: '2025-07-12',
            isActive: true
        }
    ]);

    const categoryOptions = [
        { value: 'utilities', label: 'Utilities' },
        { value: 'entertainment', label: 'Entertainment' },
        { value: 'housing', label: 'Housing' },
        { value: 'insurance', label: 'Insurance' },
        { value: 'subscriptions', label: 'Subscriptions' },
        { value: 'transport', label: 'Transportation' },
        { value: 'other', label: 'Other' }
    ];

    const frequencyOptions = [
        { value: 'weekly', label: 'Weekly' },
        { value: 'monthly', label: 'Monthly' },
        { value: 'quarterly', label: 'Quarterly' },
        { value: 'yearly', label: 'Yearly' }
    ];

    // Helper functions
    const getCurrentDate = () => new Date();

    const getNextDueDate = (dueDay, frequency = 'monthly') => {
        const now = getCurrentDate();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth();

        let nextDue = new Date(currentYear, currentMonth, dueDay);

        // If the due date has passed this month, move to next month
        if (nextDue <= now) {
            nextDue = new Date(currentYear, currentMonth + 1, dueDay);
        }

        return nextDue;
    };

    const getBillStatus = (bill) => {
        const now = getCurrentDate();
        const nextDue = getNextDueDate(bill.dueDay);
        const daysDiff = Math.ceil((nextDue - now) / (1000 * 60 * 60 * 24));

        if (daysDiff < 0) return { status: 'overdue', color: 'red', days: Math.abs(daysDiff) };
        if (daysDiff === 0) return { status: 'due_today', color: 'orange', days: 0 };
        if (daysDiff <= 3) return { status: 'due_soon', color: 'yellow', days: daysDiff };
        return { status: 'upcoming', color: 'green', days: daysDiff };
    };

    const getStatusText = (status, days) => {
        switch (status.status) {
            case 'overdue': return `${days} days overdue`;
            case 'due_today': return 'Due today';
            case 'due_soon': return `Due in ${days} days`;
            default: return `Due in ${days} days`;
        }
    };

    const handleSaveBill = async (billId, updatedData) => {
        setBills(prev => prev.map(b =>
            b.id === billId ? { ...b, ...updatedData } : b
        ));
        setEditingBill(null);
    };

    const handleAddBill = async () => {
        if (newBill.name && newBill.amount && newBill.dueDay) {
            const icons = {
                utilities: Zap,
                entertainment: Play,
                housing: Home,
                insurance: Shield,
                subscriptions: MonitorSpeaker,
                transport: Car,
                other: DollarSign
            };

            setBills(prev => [...prev, {
                id: Date.now(),
                name: newBill.name,
                amount: parseFloat(newBill.amount),
                frequency: newBill.frequency,
                dueDay: parseInt(newBill.dueDay),
                category: newBill.category,
                color: newBill.color,
                icon: icons[newBill.category] || DollarSign,
                lastPaid: null,
                isActive: true
            }]);

            setNewBill(initialNewBill);
            setShowAddForm(false);
        }
    };

    const handleDeleteBill = async (billId) => {
        setBills(prev => prev.filter(b => b.id !== billId));
    };

    const handleMarkAsPaid = (billId) => {
        const today = getCurrentDate().toISOString().split('T')[0];
        setBills(prev => prev.map(b =>
            b.id === billId ? { ...b, lastPaid: today } : b
        ));
    };

    // Calculate summary stats
    const activeBills = bills.filter(b => b.isActive);
    const totalMonthlyAmount = activeBills.reduce((sum, b) => {
        if (b.frequency === 'monthly') return sum + b.amount;
        if (b.frequency === 'yearly') return sum + (b.amount / 12);
        if (b.frequency === 'quarterly') return sum + (b.amount / 3);
        if (b.frequency === 'weekly') return sum + (b.amount * 4.33);
        return sum;
    }, 0);

    const overdueBills = activeBills.filter(b => getBillStatus(b).status === 'overdue');
    const dueTodayBills = activeBills.filter(b => getBillStatus(b).status === 'due_today');

    // Find next upcoming bill
    const upcomingBills = activeBills
        .map(b => ({ ...b, ...getBillStatus(b) }))
        .filter(b => b.status === 'upcoming' || b.status === 'due_soon')
        .sort((a, b) => a.days - b.days);

    const nextBill = upcomingBills[0];

    const headerActions = (
        <Button
            onClick={() => setShowAddForm(true)}
            icon={Plus}
        >
            Add Bill
        </Button>
    );

    const summaryCards = [
        {
            title: 'Monthly Total',
            value: formatCurrency(totalMonthlyAmount, privateMode),
            icon: CreditCard,
            badge: `${activeBills.length} bills`,
            changeType: 'neutral',
            subtitle: 'Recurring payments'
        },
        {
            title: 'Active Bills',
            value: activeBills.length.toString(),
            icon: Calendar,
            badge: activeBills.length.toString(),
            changeType: 'neutral',
            subtitle: 'Subscriptions'
        },
        {
            title: overdueBills.length > 0 || dueTodayBills.length > 0 ? 'Needs Action' : 'Next Due',
            value: overdueBills.length > 0 ? overdueBills.length.toString() :
                dueTodayBills.length > 0 ? dueTodayBills.length.toString() :
                    nextBill ? nextBill.name : 'None',
            icon: overdueBills.length > 0 || dueTodayBills.length > 0 ? AlertTriangle : Clock,
            badge: overdueBills.length > 0 ? 'Overdue' :
                dueTodayBills.length > 0 ? 'Due Today' :
                    nextBill ? `${nextBill.days} days` : 'All current',
            changeType: overdueBills.length > 0 ? 'negative' :
                dueTodayBills.length > 0 ? 'neutral' : 'positive',
            subtitle: overdueBills.length > 0 ? 'Bills overdue' :
                dueTodayBills.length > 0 ? 'Due today' :
                    nextBill ? `Due ${getNextDueDate(nextBill.dueDay).toLocaleDateString()}` : 'Up to date'
        }
    ];

    return (
        <div className={`min-h-screen transition-all duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <div className="max-w-7xl mx-auto px-4 py-8">
                <PageHeader
                    title="Bills & Subscriptions"
                    subtitle="Manage your recurring payments and subscriptions"
                    actions={headerActions}
                    darkMode={darkMode}
                />

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {summaryCards.map((card, index) => (
                        <StatCard
                            key={index}
                            {...card}
                            darkMode={darkMode}
                        />
                    ))}
                </div>

                {/* Bills Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {activeBills.map((bill) => {
                        const IconComponent = bill.icon;
                        const status = getBillStatus(bill);
                        const nextDue = getNextDueDate(bill.dueDay);

                        return (
                            <Card
                                key={bill.id}
                                darkMode={darkMode}
                                hover
                                className="p-6 group relative"
                            >
                                {/* Status Indicator */}
                                <div className={`absolute top-2 right-2 w-3 h-3 rounded-full ${status.color === 'red' ? 'bg-red-500' :
                                        status.color === 'orange' ? 'bg-orange-500' :
                                            status.color === 'yellow' ? 'bg-yellow-500' :
                                                'bg-green-500'
                                    }`} />

                                {/* Header */}
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-lg bg-${bill.color}-100`}>
                                            <IconComponent className={`text-${bill.color}-600`} size={20} />
                                        </div>
                                        <div>
                                            <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                                {bill.name}
                                            </h3>
                                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                                {bill.frequency}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            icon={Edit3}
                                            onClick={() => setEditingBill(bill.id)}
                                            darkMode={darkMode}
                                        />
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            icon={Trash2}
                                            onClick={() => handleDeleteBill(bill.id)}
                                            className="text-red-500 hover:text-red-600"
                                        />
                                    </div>
                                </div>

                                {/* Amount */}
                                <div className="mb-4">
                                    <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                        {formatCurrency(bill.amount, privateMode)}
                                    </div>
                                    <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                        per {bill.frequency.replace('ly', '')}
                                    </div>
                                </div>

                                {/* Due Date & Status */}
                                <div className="mb-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                            Due Date
                                        </span>
                                        <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                            {nextDue.toLocaleDateString()}
                                        </span>
                                    </div>

                                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${status.color === 'red' ? 'bg-red-100 text-red-800' :
                                            status.color === 'orange' ? 'bg-orange-100 text-orange-800' :
                                                status.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-green-100 text-green-800'
                                        }`}>
                                        {getStatusText(status, status.days)}
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1">
                                        Last paid: {bill.lastPaid ? new Date(bill.lastPaid).toLocaleDateString() : '—'}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2">
                                    <Button
                                        onClick={() => handleMarkAsPaid(bill.id)}
                                        size="sm"
                                        className="flex-1"
                                        variant={status.color === 'red' || status.color === 'orange' ? 'primary' : 'secondary'}
                                        icon={CheckCircle}
                                    >
                                        Mark Paid
                                    </Button>
                                </div>

                                {/* Edit Form */}
                                {editingBill === bill.id && (
                                    <div className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} pt-4 mt-4`}>
                                        <div className="space-y-3">
                                            <Input
                                                type="text"
                                                defaultValue={bill.name}
                                                placeholder="Bill name"
                                                darkMode={darkMode}
                                                onBlur={(e) => handleSaveBill(bill.id, { name: e.target.value })}
                                            />
                                            <Input
                                                type="number"
                                                defaultValue={bill.amount}
                                                placeholder="Amount"
                                                step="0.01"
                                                darkMode={darkMode}
                                                onBlur={(e) => handleSaveBill(bill.id, { amount: parseFloat(e.target.value) || 0 })}
                                            />
                                            <Input
                                                type="number"
                                                defaultValue={bill.dueDay}
                                                placeholder="Due day (1-31)"
                                                min="1"
                                                max="31"
                                                darkMode={darkMode}
                                                onBlur={(e) => handleSaveBill(bill.id, { dueDay: parseInt(e.target.value) || 1 })}
                                            />
                                            <div className="flex gap-2">
                                                <Button
                                                    onClick={() => setEditingBill(null)}
                                                    icon={Save}
                                                    size="sm"
                                                    className="flex-1"
                                                >
                                                    Save
                                                </Button>
                                                <Button
                                                    onClick={() => setEditingBill(null)}
                                                    variant="secondary"
                                                    size="sm"
                                                    icon={X}
                                                    darkMode={darkMode}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </Card>
                        );
                    })}
                </div>

                {/* Add Bill Modal */}
                <Modal
                    isOpen={showAddForm}
                    onClose={() => setShowAddForm(false)}
                    title="Add New Bill"
                    darkMode={darkMode}
                    actions={[
                        <Button
                            key="cancel"
                            variant="secondary"
                            onClick={() => setShowAddForm(false)}
                            darkMode={darkMode}
                        >
                            Cancel
                        </Button>,
                        <Button
                            key="add"
                            onClick={handleAddBill}
                        >
                            Add Bill
                        </Button>
                    ]}
                >
                    <div className="space-y-4">
                        <Input
                            type="text"
                            placeholder="Bill Name (e.g., Netflix, Rent)"
                            value={newBill.name}
                            onChange={(e) => setNewBill(prev => ({ ...prev, name: e.target.value }))}
                            darkMode={darkMode}
                        />
                        <Input
                            type="number"
                            placeholder="Amount"
                            step="0.01"
                            value={newBill.amount}
                            onChange={(e) => setNewBill(prev => ({ ...prev, amount: e.target.value }))}
                            darkMode={darkMode}
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <Select
                                value={newBill.frequency}
                                onChange={(e) => setNewBill(prev => ({ ...prev, frequency: e.target.value }))}
                                options={frequencyOptions}
                                darkMode={darkMode}
                            />
                            <Input
                                type="number"
                                placeholder="Due Day (1-31)"
                                min="1"
                                max="31"
                                value={newBill.dueDay}
                                onChange={(e) => setNewBill(prev => ({ ...prev, dueDay: e.target.value }))}
                                darkMode={darkMode}
                            />
                        </div>
                        <Select
                            value={newBill.category}
                            onChange={(e) => setNewBill(prev => ({ ...prev, category: e.target.value }))}
                            options={categoryOptions}
                            darkMode={darkMode}
                        />
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default BillsPage;