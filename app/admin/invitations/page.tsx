'use client';

import { useState } from 'react';
import { Send, CheckCircle, XCircle, Loader2, Mail, User, AlertTriangle, Download, List, UserCheck, UserX, ClipboardList, Building2, Briefcase } from 'lucide-react';

type SendResult = {
  email: string;
  name: string;
  success: boolean;
  error?: string;
  alreadySent?: boolean;
};

type InvitationRecord = {
  id: string;
  name: string;
  email: string;
  sentAt: string;
  isRegistered: boolean;
};

type InvitationListData = {
  totalInvited: number;
  totalRegistered: number;
  invitations: InvitationRecord[];
};

type RegistrationRecord = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profession: string;
  institution: string;
  createdAt: string;
};

type ActiveTab = 'send' | 'list' | 'registrations';

export default function AdminInvitationsPage() {
  const [recipients, setRecipients] = useState('');
  const [secret, setSecret] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingList, setIsLoadingList] = useState(false);
  const [isLoadingRegistrations, setIsLoadingRegistrations] = useState(false);
  const [results, setResults] = useState<{
    totalSent: number;
    totalFailed: number;
    totalSkipped: number;
    results: SendResult[];
  } | null>(null);
  const [invitationList, setInvitationList] = useState<InvitationListData | null>(null);
  const [registrationsList, setRegistrationsList] = useState<RegistrationRecord[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>('send');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await fetch('/api/admin/send-invitations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emails: recipients, secret }),
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

  const handleLoadList = async () => {
    if (!secret) {
      setError('Entrez la clé secrète admin');
      return;
    }
    setIsLoadingList(true);
    setError(null);

    try {
      const response = await fetch(`/api/admin/send-invitations?secret=${encodeURIComponent(secret)}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Une erreur est survenue');
      }

      setInvitationList(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setIsLoadingList(false);
    }
  };

  const handleLoadRegistrations = async () => {
    if (!secret) {
      setError('Entrez la clé secrète admin');
      return;
    }
    setIsLoadingRegistrations(true);
    setError(null);

    try {
      const response = await fetch(`/api/admin/registrations?secret=${encodeURIComponent(secret)}&format=json`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Une erreur est survenue');
      }

      setRegistrationsList(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setIsLoadingRegistrations(false);
    }
  };

  const handleDownloadInvitationsCsv = () => {
    if (!secret) return;
    window.open(`/api/admin/send-invitations?secret=${encodeURIComponent(secret)}&format=csv`, '_blank');
  };

  const handleDownloadRegistrationsCsv = () => {
    if (!secret) return;
    window.open(`/api/admin/registrations?secret=${encodeURIComponent(secret)}`, '_blank');
  };

  const recipientCount = recipients
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && line.includes('@')).length;

  const needsSecret = !secret && activeTab !== 'send';

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#061024] to-[#0a1a3a] py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#F33349]/20 mb-4">
            <Mail className="w-8 h-8 text-[#F33349]" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Invitations personnalisées
          </h1>
          <p className="text-white/60">
            Journée Scientifique MIRACL.ai - 8 Avril 2026
          </p>
        </div>

        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('send')}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-colors ${
              activeTab === 'send'
                ? 'bg-white text-[#061024]'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            <Send className="w-4 h-4" />
            Envoyer
          </button>
          <button
            onClick={() => {
              setActiveTab('list');
              if (!invitationList && secret) {
                handleLoadList();
              }
            }}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-colors ${
              activeTab === 'list'
                ? 'bg-white text-[#061024]'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            <List className="w-4 h-4" />
            Invités
          </button>
          <button
            onClick={() => {
              setActiveTab('registrations');
              if (!registrationsList && secret) {
                handleLoadRegistrations();
              }
            }}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-colors ${
              activeTab === 'registrations'
                ? 'bg-white text-[#061024]'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            <ClipboardList className="w-4 h-4" />
            Inscrits
          </button>
        </div>

        {activeTab === 'send' && (
          <>
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-xl">
              <div className="mb-6">
                <label htmlFor="secret" className="block text-sm font-semibold text-[#061024] mb-2">
                  Clé secrète admin
                </label>
                <input
                  type="password"
                  id="secret"
                  value={secret}
                  onChange={(event) => setSecret(event.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#00B4D8] focus:ring-2 focus:ring-[#00B4D8]/20 outline-none transition-all"
                  placeholder="Entrez la clé secrète"
                  required
                />
              </div>

              <div className="mb-6">
                <label htmlFor="recipients" className="block text-sm font-semibold text-[#061024] mb-2">
                  Liste des invités
                </label>
                <p className="text-xs text-gray-500 mb-3">
                  Un invité par ligne. Commencer par <strong>M</strong> ou <strong>F</strong> pour le genre :
                </p>
                <div className="bg-gray-50 rounded-lg p-3 mb-3 text-xs font-mono text-gray-600 space-y-1">
                  <p>M, Pr Jean Dupont, jean.dupont@hopital.fr</p>
                  <p>F, Dr Marie Martin, marie.martin@chu.fr</p>
                  <p>F, Mme Sophie Bernard &lt;sophie.bernard@univ.fr&gt;</p>
                </div>
                <textarea
                  id="recipients"
                  value={recipients}
                  onChange={(event) => setRecipients(event.target.value)}
                  rows={10}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#00B4D8] focus:ring-2 focus:ring-[#00B4D8]/20 outline-none transition-all resize-none font-mono text-sm"
                  placeholder={`M, Pr Jean Dupont, jean.dupont@hopital.fr\nF, Dr Marie Martin, marie.martin@chu.fr\nF, Mme Sophie Bernard <sophie.bernard@univ.fr>`}
                  required
                />
                <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                  <User className="w-4 h-4" />
                  <span>{recipientCount} invité{recipientCount > 1 ? 's' : ''} détecté{recipientCount > 1 ? 's' : ''}</span>
                </div>
              </div>

              <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-sm text-amber-800">
                  <strong>Email personnalisé :</strong> Chaque invité recevra un email avec son nom dans l&apos;objet et une salutation personnelle.
                </p>
              </div>

              {error && activeTab === 'send' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading || recipientCount === 0}
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
                  {results.totalSkipped > 0 && (
                    <div className="flex-1 bg-amber-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-amber-600">{results.totalSkipped}</div>
                      <div className="text-sm text-amber-700">Déjà envoyé{results.totalSkipped > 1 ? 's' : ''}</div>
                    </div>
                  )}
                  <div className="flex-1 bg-red-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-red-600">{results.totalFailed}</div>
                    <div className="text-sm text-red-700">Échoué{results.totalFailed > 1 ? 's' : ''}</div>
                  </div>
                </div>

                <div className="space-y-2 max-h-80 overflow-y-auto">
                  {results.results.map((result, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
                        result.success ? 'bg-green-50' : result.alreadySent ? 'bg-amber-50' : 'bg-red-50'
                      }`}
                    >
                      {result.success ? (
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      ) : result.alreadySent ? (
                        <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-[#061024] truncate">{result.name}</p>
                        <p className="text-xs text-gray-500 truncate">{result.email}</p>
                      </div>
                      {result.error && (
                        <span className={`text-xs flex-shrink-0 ${result.alreadySent ? 'text-amber-600' : 'text-red-600'}`}>{result.error}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {activeTab === 'list' && (
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            {needsSecret && (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">Entrez la clé secrète admin dans l&apos;onglet Envoyer pour accéder à la liste.</p>
              </div>
            )}

            {secret && !invitationList && !isLoadingList && (
              <div className="text-center py-8">
                <button
                  onClick={handleLoadList}
                  className="py-3 px-6 bg-[#00B4D8] text-white font-semibold rounded-xl hover:bg-[#0096b4] transition-colors flex items-center justify-center gap-2 mx-auto"
                >
                  <List className="w-5 h-5" />
                  Charger la liste
                </button>
              </div>
            )}

            {isLoadingList && (
              <div className="text-center py-8">
                <Loader2 className="w-8 h-8 animate-spin text-[#00B4D8] mx-auto" />
                <p className="text-gray-500 mt-3">Chargement...</p>
              </div>
            )}

            {error && activeTab === 'list' && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                {error}
              </div>
            )}

            {invitationList && (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-[#061024]">Invités</h2>
                  <div className="flex gap-2">
                    <button
                      onClick={handleLoadList}
                      className="py-2 px-4 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Actualiser
                    </button>
                    <button
                      onClick={handleDownloadInvitationsCsv}
                      className="py-2 px-4 text-sm bg-[#00B4D8] text-white rounded-lg hover:bg-[#0096b4] transition-colors flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      CSV
                    </button>
                  </div>
                </div>

                <div className="flex gap-4 mb-6">
                  <div className="flex-1 bg-blue-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">{invitationList.totalInvited}</div>
                    <div className="text-sm text-blue-700">Invité{invitationList.totalInvited > 1 ? 's' : ''}</div>
                  </div>
                  <div className="flex-1 bg-green-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">{invitationList.totalRegistered}</div>
                    <div className="text-sm text-green-700">Inscrit{invitationList.totalRegistered > 1 ? 's' : ''}</div>
                  </div>
                  <div className="flex-1 bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-gray-600">{invitationList.totalInvited - invitationList.totalRegistered}</div>
                    <div className="text-sm text-gray-600">En attente</div>
                  </div>
                </div>

                {invitationList.invitations.length === 0 ? (
                  <p className="text-center text-gray-500 py-6">Aucune invitation envoyée.</p>
                ) : (
                  <div className="space-y-2 max-h-[500px] overflow-y-auto">
                    {invitationList.invitations.map((invitation) => (
                      <div
                        key={invitation.id}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
                          invitation.isRegistered ? 'bg-green-50' : 'bg-gray-50'
                        }`}
                      >
                        {invitation.isRegistered ? (
                          <UserCheck className="w-5 h-5 text-green-600 flex-shrink-0" />
                        ) : (
                          <UserX className="w-5 h-5 text-gray-400 flex-shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-[#061024] truncate">{invitation.name}</p>
                          <p className="text-xs text-gray-500 truncate">{invitation.email}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <span className={`text-xs font-medium ${invitation.isRegistered ? 'text-green-600' : 'text-gray-400'}`}>
                            {invitation.isRegistered ? 'Inscrit' : 'Non inscrit'}
                          </span>
                          <p className="text-xs text-gray-400">
                            {new Date(invitation.sentAt).toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {activeTab === 'registrations' && (
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            {needsSecret && (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">Entrez la clé secrète admin dans l&apos;onglet Envoyer pour accéder aux inscriptions.</p>
              </div>
            )}

            {secret && !registrationsList && !isLoadingRegistrations && (
              <div className="text-center py-8">
                <button
                  onClick={handleLoadRegistrations}
                  className="py-3 px-6 bg-[#00B4D8] text-white font-semibold rounded-xl hover:bg-[#0096b4] transition-colors flex items-center justify-center gap-2 mx-auto"
                >
                  <ClipboardList className="w-5 h-5" />
                  Charger les inscriptions
                </button>
              </div>
            )}

            {isLoadingRegistrations && (
              <div className="text-center py-8">
                <Loader2 className="w-8 h-8 animate-spin text-[#00B4D8] mx-auto" />
                <p className="text-gray-500 mt-3">Chargement...</p>
              </div>
            )}

            {error && activeTab === 'registrations' && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                {error}
              </div>
            )}

            {registrationsList && (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-[#061024]">Inscrits</h2>
                  <div className="flex gap-2">
                    <button
                      onClick={handleLoadRegistrations}
                      className="py-2 px-4 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Actualiser
                    </button>
                    <button
                      onClick={handleDownloadRegistrationsCsv}
                      className="py-2 px-4 text-sm bg-[#00B4D8] text-white rounded-lg hover:bg-[#0096b4] transition-colors flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      CSV
                    </button>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4 text-center mb-6">
                  <div className="text-2xl font-bold text-green-600">{registrationsList.length}</div>
                  <div className="text-sm text-green-700">Inscrit{registrationsList.length > 1 ? 's' : ''}</div>
                </div>

                {registrationsList.length === 0 ? (
                  <p className="text-center text-gray-500 py-6">Aucune inscription.</p>
                ) : (
                  <div className="space-y-2 max-h-[500px] overflow-y-auto">
                    {registrationsList.map((registration) => (
                      <div
                        key={registration.id}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-50"
                      >
                        <UserCheck className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-[#061024] truncate">
                            {registration.firstName} {registration.lastName}
                          </p>
                          <p className="text-xs text-gray-500 truncate">{registration.email}</p>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-xs text-gray-400 flex items-center gap-1">
                              <Briefcase className="w-3 h-3" />
                              {registration.profession}
                            </span>
                            <span className="text-xs text-gray-400 flex items-center gap-1">
                              <Building2 className="w-3 h-3" />
                              {registration.institution}
                            </span>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-xs text-gray-400">
                            {new Date(registration.createdAt).toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
