import React, { useState} from 'react';
import '@/styles/globals.css';
interface EditReviewFormProps {
  onSubmit: (editedReview: EditedReviewData) => void;
  review: ReviewData;
  error: string;
}

export interface ReviewData {
    reviewId: string;
    userId: string;
    productId: string;
    review: string;
    rating: number;
}

export interface EditedReviewData {
    reviewId: string;
    userId: string;
    productId: string;
    review: string;
    rating: number;
}

const EditReviewForm: React.FC<EditReviewFormProps> = ({ onSubmit, review, error }) => {
    const [formData, setFormData] = useState<EditedReviewData>(review);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
        ...prevState,
        [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="w-full max-w-xs">
            <form className="p-4 bg-gray-50" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="rating" className="block text-sm font-medium text-gray-700">Rating</label>
                <select
                   id="rating"
                   name="rating"
                   className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                   value={formData.rating}
                   onChange={(e) => {handleChange}}
                >
                  <option value="">Select a rating</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
              <div className="mb-6">
                <label htmlFor="review" className="block text-sm font-medium text-gray-700">Your Review</label>
                <textarea
                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                   id="review"
                   placeholder="Stock"
                   name="review"
                   value={formData.review}
                   onChange={handleChange}
                ></textarea>
              </div>
              <button type="submit" className="w-full p-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">
                Submit Review
              </button>
            </form>
        </div>
    );
};

export default EditReviewForm;