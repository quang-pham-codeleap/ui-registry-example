/** State managed by the dialog navigation reducer */
type NavigationState = {
  currentStep: string;
  history: string[];
};

/** Actions dispatched to the dialog navigation reducer */
type NavigationAction = { type: 'navigate'; step: string } | { type: 'back' };

/**
 * Pure reducer that manages step-based navigation state.
 * Handles forward navigation (pushing current step onto history)
 * and backward navigation (popping from history).
 */
function navigationReducer(state: NavigationState, action: NavigationAction): NavigationState {
  switch (action.type) {
    case 'navigate':
      return {
        currentStep: action.step,
        history: [...state.history, state.currentStep],
      };
    case 'back': {
      if (state.history.length === 0) return state;
      return {
        currentStep: state.history[state.history.length - 1],
        history: state.history.slice(0, -1),
      };
    }
    default:
      return state;
  }
}

export default navigationReducer;
export type { NavigationState, NavigationAction };
