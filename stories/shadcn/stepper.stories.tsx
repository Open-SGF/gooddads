import type { Meta, StoryObj } from '@storybook/react'
import { Step } from '@stepperize/react'

import { 
  defineStepper,
  Stepper,
  StepperNavigation,
  StepperControls,
  StepperPanel,
  StepperStep,
  StepperTitle,
  StepperDescription,
  Button,
} from '../../resources/js/Components/ui';

const steps: Step[] = [
  { id: "step-1", title: "Step 1", description: "This is the first step" },
  { id: "step-2", title: "Step 2", description: "This is the second step" },
  { id: "step-3", title: "Step 3", description: "This is the third step" },
];

const stepperInstance = defineStepper(...steps);

const meta: Meta<typeof Stepper> = {
    title: "shadcn/Stepper",
    component: Stepper,
    args: {
        instance: stepperInstance,
        variant: "horizontal",
        className: "space-y-4",
    },
    argTypes: {
        variant: {
            control: "radio",
            options: ["horizontal", "vertical"],
        },
    },
    render: (args) => (
      <Stepper instance = { stepperInstance } className="space-y-4" variant="horizontal">
      {({ methods }) => (
          <React.Fragment>
              <StepperNavigation>
                  {methods.all.map((step) => (
                  <StepperStep
                      key={step.id}
                      of={step}
                      onClick={() => methods.goTo(step.id)}
                  >
                      <StepperTitle>{step.title}-{step.id}</StepperTitle>
                      <StepperDescription>{step.description}</StepperDescription>
                  </StepperStep>
                  ))}
              </StepperNavigation>
              {methods.switch({
                  "step-1": (step) => <Content step={step} />,
                  "step-2": (step) => <Content step={step} />,
                  "step-3": (step) => <Content step={step} />,
              })}
              <StepperControls>
                  {!methods.isLast && (
                  <Button
                      variant="secondary"
                      onClick={methods.prev}
                      disabled={methods.isFirst}
                  >
                      Previous
                  </Button>
                  )}
                  <Button variant="secondary" onClick={methods.isLast ? methods.reset : methods.next}>
                  {methods.isLast ? "Reset" : "Next"}
                  </Button>
              </StepperControls>
          </React.Fragment>
      )}</Stepper>
	),
} satisfies Meta<typeof Stepper>

const Content = ({ step }: { step: Step }) => {
  return (
    <StepperPanel when={ step } className="h-[200px] flex items-center justify-center rounded border bg-slate-50 p-8">
      <p className="text-xl font-normal">Content for {step.id}</p>
    </StepperPanel>
  );
};

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {}
