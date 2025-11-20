'use client';

import { useEffect, useState } from 'react';

interface StakeFormProps {
  tokenBalance: number;
  onStake: (amount: number) => Promise<void>;
}

export const Test: React.FC<StakeFormProps> = ({ tokenBalance, onStake }) => {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [stakedAmount, setStakedAmount] = useState<number | null>(null);

  const numAmount = amount ? Number.parseFloat(amount) : 0;
  const isValid = numAmount > 0 && numAmount <= tokenBalance;

  const handleStake = async () => {
    if (!isValid) return;

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await onStake(numAmount);
      setSuccess(true);
      setStakedAmount(numAmount);
      setAmount('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Stake failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  // Auto-dismiss messages
  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess(false);
        setError(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  return (
    <div style={{ padding: '20px', maxWidth: '400px' }}>
      <h2>Stake Tokens</h2>

      <div style={{ marginBottom: '10px' }}>
        <p>Available Balance: {tokenBalance}</p>
      </div>

      <input
        disabled={loading}
        min='0'
        onChange={(e) => setAmount(e.target.value)}
        placeholder='Enter amount'
        step='0.01'
        style={{
          width: '100%',
          padding: '8px',
          marginBottom: '10px',
          opacity: loading ? 0.5 : 1,
        }}
        type='number'
        value={amount}
      />

      {numAmount > tokenBalance && amount && (
        <p style={{ color: 'red', fontSize: '12px' }}>Amount exceeds balance</p>
      )}

      {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}

      {success && (
        <p style={{ color: 'green', marginBottom: '10px' }}>
          Staked {stakedAmount} tokens!
        </p>
      )}

      <button
        disabled={!isValid || loading}
        onClick={handleStake}
        style={{
          width: '100%',
          padding: '10px',
          cursor: isValid && !loading ? 'pointer' : 'not-allowed',
          opacity: isValid && !loading ? 1 : 0.5,
        }}
        type='button'
      >
        {loading ? 'Staking...' : 'Stake'}
      </button>
    </div>
  );
};
