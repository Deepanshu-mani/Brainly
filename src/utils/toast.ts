import toast from 'react-hot-toast';

export const showToast = {
  success: (message: string) => {
    toast.success(message);
  },
  
  error: (message: string) => {
    toast.error(message);
  },
  
  loading: (message: string) => {
    return toast.loading(message);
  },
  
  dismiss: (toastId: string) => {
    toast.dismiss(toastId);
  },
  
  // Custom toasts for common actions
  contentAdded: (type: string) => {
    toast.success(`${type} added successfully!`);
  },
  
  contentUpdated: () => {
    toast.success('Content updated successfully!');
  },
  
  contentDeleted: () => {
    toast.success('Content deleted successfully!');
  },
  
  aiSearchStarted: () => {
    return toast.loading('Searching through your memories...');
  },
  
  aiSearchCompleted: () => {
    toast.success('Search completed!');
  },
  
  networkError: () => {
    toast.error('Network error. Please try again.');
  },
  
  authError: () => {
    toast.error('Authentication failed. Please login again.');
  },
  
  copySuccess: () => {
    toast.success('Copied to clipboard!');
  }
};
