import { useState } from 'react';
import { useLocation } from 'wouter';
import Checkout from '@/components/ui/checkout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';

export default function PremiumPage() {
  const [_, setLocation] = useLocation();
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{
    name: string;
    price: number;
    description: string;
  } | null>(null);

  const plans = [
    {
      name: 'Pro Mentor',
      price: 19.99,
      features: [
        'Access to premium skill exchanges',
        'Priority matching with top mentors',
        'Enhanced profile visibility',
        'Unlimited video sessions',
        'Dedicated support'
      ],
      description: 'Perfect for serious learners looking to accelerate their skills'
    },
    {
      name: 'Enterprise Learning',
      price: 49.99,
      features: [
        'Everything in Pro Mentor',
        'Team collaboration features',
        'Corporate skill exchange network',
        'Advanced analytics',
        'Custom learning paths',
        'API access'
      ],
      description: 'Ideal for organizations and teams'
    }
  ];

  const handleSubscribe = (plan: typeof plans[0]) => {
    setSelectedPlan({
      name: plan.name,
      price: plan.price,
      description: `Subscription to ${plan.name} plan`
    });
    setShowCheckout(true);
  };

  const handlePaymentSuccess = () => {
    setShowCheckout(false);
    // Redirect to dashboard or confirmation page
    setLocation('/dashboard');
  };

  const handlePaymentCancel = () => {
    setShowCheckout(false);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-2 text-center">Upgrade Your Learning Experience</h1>
      <p className="text-lg text-center mb-12 text-muted-foreground">
        Choose the plan that fits your learning journey
      </p>

      {showCheckout && selectedPlan ? (
        <div className="max-w-md mx-auto">
          <Button
            variant="ghost"
            className="mb-4"
            onClick={() => setShowCheckout(false)}
          >
            ← Back to plans
          </Button>
          <Checkout
            amount={selectedPlan.price}
            userId={1} // This would be the actual user ID in production
            description={selectedPlan.description}
            onSuccess={handlePaymentSuccess}
            onCancel={handlePaymentCancel}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan) => (
            <Card key={plan.name} className="relative overflow-hidden">
              {plan.name === 'Enterprise Learning' && (
                <Badge className="absolute top-4 right-4 bg-primary/90">
                  Popular
                </Badge>
              )}
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-muted-foreground"> / month</span>
                </div>
                <ul className="space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check size={18} className="text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  onClick={() => handleSubscribe(plan)}
                >
                  Subscribe Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}