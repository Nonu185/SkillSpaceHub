import { useEffect, useState } from 'react';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { apiRequest } from '@/lib/queryClient';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

// Make sure to call loadStripe outside of a component's render to avoid
// recreating the Stripe object on every render.
if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
  console.error('Missing required Stripe key: VITE_STRIPE_PUBLIC_KEY');
}

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

interface CheckoutFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

const CheckoutForm = ({ onSuccess, onCancel }: CheckoutFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin,
      },
      redirect: 'if_required',
    });

    if (error) {
      toast({
        title: 'Payment Failed',
        description: error.message || 'An error occurred during payment processing.',
        variant: 'destructive',
      });
      setIsProcessing(false);
    } else {
      toast({
        title: 'Payment Successful',
        description: 'Thank you for your payment!',
      });
      setIsProcessing(false);
      if (onSuccess) onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      <div className="flex justify-between mt-6">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onCancel}
          disabled={isProcessing}
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          disabled={!stripe || isProcessing}
          className="min-w-[120px]"
        >
          {isProcessing ? 'Processing...' : 'Pay Now'}
        </Button>
      </div>
    </form>
  );
};

interface CheckoutProps {
  amount: number;
  userId: number;
  description?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function Checkout({ amount, userId, description, onSuccess, onCancel }: CheckoutProps) {
  const [clientSecret, setClientSecret] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaymentIntent = async () => {
      try {
        setLoading(true);
        const response = await apiRequest('POST', '/api/create-payment-intent', {
          amount,
          userId,
          description: description || 'SkillSpace payment'
        });
        
        const data = await response.json();
        if (response.ok) {
          setClientSecret(data.clientSecret);
        } else {
          setError(data.error || 'An error occurred while creating the payment intent.');
        }
      } catch (err) {
        setError('Network error. Please try again later.');
        console.error('Error creating payment intent:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentIntent();
  }, [amount, userId, description]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-destructive/10 text-destructive rounded-lg">
        <h3 className="font-semibold">Payment Error</h3>
        <p>{error}</p>
        <Button 
          variant="outline" 
          className="mt-4" 
          onClick={onCancel}
        >
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-card p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-6">Complete Your Payment</h2>
      {clientSecret && (
        <Elements 
          stripe={stripePromise} 
          options={{ 
            clientSecret,
            appearance: { theme: 'stripe' }
          }}
        >
          <CheckoutForm onSuccess={onSuccess} onCancel={onCancel} />
        </Elements>
      )}
    </div>
  );
}