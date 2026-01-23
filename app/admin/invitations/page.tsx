'use client';

import { useState } from 'react';
import { Send, CheckCircle, XCircle, Loader2, Mail } from 'lucide-react';

type SendResult = {
  email: string;
  success: boolean;
  error?: string;
};

export default function AdminInvitationsPage() {
  const [emails, setEmails] = useState('');
  const [secret, setSecret] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<{
    totalSent: number;
    totalFailed: number;
    results: SendResult[];
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await fetch('/api/admin/send-invitations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emails, secret }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Une erreur est survenue');
      }

      setResults(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setIsLoading(false);
    }
  };

  const emailCount = emails
    .split(/[,\n]/)
    .map((email) => email.trim())
    .filter((email) => email.length > 0 && email.includes('@')).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#061024] to-[#0a1a3a] py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#00B4D8]/20 mb-4">
            <Mail className="w-8 h-8 text-[#00B4D8]" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Envoi d&apos;invitations
          </h1>
          <p className="text-white/60">
            Journée Scientifique MIRACL.ai - 8 Avril 2026
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-xl">
          <div className="mb-6">
            <label htmlFor="secret" className="block text-sm font-semibold text-[#061024] mb-2">
              Clé secrète admin
            </label>
            <input
              type="password"
              id="secret"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#00B4D8] focus:ring-2 focus:ring-[#00B4D8]/20 outline-none transition-all"
              placeholder="Entrez la clé secrète"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="emails" className="block text-sm font-semibold text-[#061024] mb-2">
              Adresses email
              <span className="font-normal text-gray-500 ml-2">
                (séparées par des virgules ou retours à la ligne)
              </span>
            </label>
            <textarea
              id="emails"
              value={emails}
              onChange={(e) => setEmails(e.target.value)}
              rows={8}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#00B4D8] focus:ring-2 focus:ring-[#00B4D8]/20 outline-none transition-all resize-none font-mono text-sm"
              placeholder={`email1@example.com\nemail2@example.com\nemail3@example.com`}
              required
            />
            <p className="mt-2 text-sm text-gray-500">
              {emailCount} email{emailCount > 1 ? 's' : ''} détecté{emailCount > 1 ? 's' : ''}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || emailCount === 0}
            className="w-full py-4 px-6 bg-[#F33349] text-white font-semibold rounded-xl hover:bg-[#e02a3f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Envoi en cours...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Envoyer les invitations
              </>
            )}
          </button>
        </form>

        {results && (
          <div className="mt-8 bg-white rounded-2xl p-8 shadow-xl">
            <h2 className="text-xl font-bold text-[#061024] mb-4">Résultats</h2>

            <div className="flex gap-4 mb-6">
              <div className="flex-1 bg-green-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{results.totalSent}</div>
                <div className="text-sm text-green-700">Envoyé{results.totalSent > 1 ? 's' : ''}</div>
              </div>
              <div className="flex-1 bg-red-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-red-600">{results.totalFailed}</div>
                <div className="text-sm text-red-700">Échoué{results.totalFailed > 1 ? 's' : ''}</div>
              </div>
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto">
              {results.results.map((result, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg ${
                    result.success ? 'bg-green-50' : 'bg-red-50'
                  }`}
                >
                  {result.success ? (
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                  )}
                  <span className="font-mono text-sm truncate">{result.email}</span>
                  {result.error && (
                    <span className="text-xs text-red-600 ml-auto">{result.error}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 text-center">
          <a
            href="/email-templates/invitation-journee-scientifique.html"
            target="_blank"
            className="text-[#00B4D8] hover:underline text-sm"
          >
            Prévisualiser l&apos;email →
          </a>
        </div>
      </div>
    </div>
  );
}
