import { Info, HelpCircle } from 'lucide-react';

export default function CancellationAndHelpSection({ productCode }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Cancellation Policy Card */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg transition hover:shadow-xl">
                <div className="flex items-center gap-4">
                    <div className="bg-red-700 p-2 rounded-lg">
                        <Info className="h-5 w-5 text-red-50" />
                    </div>
                    <div>
                        <h3 className="text-xl font-normal text-gray-900">Cancellation Policy</h3>
                    </div>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed mt-3">Cancel up to <strong>24 hours in advance</strong> for a full refund. Cancellations made less than 24 hours before the experience start time are non-refundable.</p>
            </div>

            {/* Help & Product Code Card */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg transition hover:shadow-xl">
                <div className="flex items-start gap-4">
                    <div className="bg-green-700 p-2 rounded-lg">
                        <HelpCircle className="h-5 w-5 text-green-50" />
                    </div>
                    <div>
                        <h3 className="text-xl font-normal text-gray-900">Questions?</h3>
                    </div>
                </div>
                <div>
                    <p className="text-sm text-gray-700 leading-relaxed mt-3"> Visit the <span>MaltaXplore Help Centre</span> for further assistance.</p>
                    {productCode && (
                        <p className="text-sm text-red-600">
                            <span className="font-medium text-gray-700">Product code:</span> {productCode}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
