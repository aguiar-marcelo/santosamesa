interface User {
    email: string;
    id?: number;
    profilePicture?: string;
    exibitionName?: string;
    userName?: string;
}

interface UserData {
    id: number;
    exibitionName: string | null;
    userName: string | null;
    profilePicture: string | null;
}

interface ProfilePageProps {
    userId: string;
}

interface LocalData {
    id: string;
    name: string;
    url_img: string;
    aboutUs: string;
}

interface Comment {
    message: string;
}

interface Avaliacao {
    id: string;
    value: number;
    restaurantId: string;
    userId: string;
    comments?: string | null;
    createdAt: string;
    user?: { id: string; profilePicture?: string; exibitionName?: string; userName?: string };
}

interface Rating {
    id: string;
    value: number;
    restaurantId: string;
    userId: string;
    comments: string | null;
    createdAt: string;
    restaurant: Restaurant;
    user: { userName: string };
}

interface RestaurantAverageRating {
    id: number;
    name: string;
    url_img: string;
    aboutUs: string;
    averageRating: number;
}

interface Restaurant {
    id: string;
    name: string;
    url_img: string;
    aboutUs: string;
    averageRating?: number;
    category?: string | { id: string; name: string };
    categoryName?: string;
}

interface Category {
    id: string;
    name: string;
}

interface FilterCategoryProps {
    categories: Category[];
    selectedCategories: string[];
    onCategoryChange: (categoryName: string) => void;
    selectedRatings: number[];
    onRatingChange: (rating: number) => void;
}

interface RatingFilterProps {
    selectedRatings: number[];
    onRatingClick: (rating: number) => void;
}

interface EditProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: {
        exibitionName?: string | null;
        userName?: string | null;
        profilePicture?: string | null;
        id?: number;
        email?: string | null;
    } | null;
    onSaveSuccess: (updatedUser: any) => void;
    onOpenDeleteModal: () => void;
}

interface ModalDeleteProfileProps {
    isOpen: boolean;
    onClose: () => void;
    userId?: number;
    onDeleteSuccess: () => void;
}
